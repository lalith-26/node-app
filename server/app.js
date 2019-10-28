const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const WebSocket = require('ws');
const logger = require('./logs/logger');
const config = require('./config');
const users = require('./routes/users');
const cpuData = require('./routes/getCPUData');
const CPU = require('./models/CpuData');


const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const cpuCurrentData = new CPU(JSON.parse(message));
    CPU.addCpuData(cpuCurrentData, (err, data) => {
      if (err) logger.error(err);
      else logger.info(data);
    });
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

mongoose.connect(config.databaseURL, { useNewUrlParser: true }, (err) => {
  if (err) {
    logger.error(err);
  } else {
    logger.info('connected to mongoDB server');
  }
});

const PORT = process.env.serverPort || 8089;

const myStream = {
  write: (text) => {
    logger.info(text);
  }
};


app.use(morgan('combined', { stream: myStream }));

app.use(helmet());

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(passport.session());

require('./util/passport')(passport);

app.use((err, req, res, next) => {
  res.status(500).send('something wrong with the server');
  next();
});

app.use('/api/users', users);
app.use('/api/cpu', cpuData);

server.listen(PORT, () => {
  // eslint-disable-next-line quotes
  logger.info(`server started at the port: ${PORT}`);
});
