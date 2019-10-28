const WebSocket = require('ws');
const logger = require('./lib/log');
const MsgBuilder = require('./lib/msg_builder');

const ws = new WebSocket('ws://localhost:8089');
const INTERVAL = 5000;


ws.on('open', () => {
  logger.info('connected to server');
  setInterval(() => {
    ws.send(JSON.stringify(MsgBuilder()));
  }, INTERVAL);
});

ws.on('error', (err) => {
  logger.error(err);
});
