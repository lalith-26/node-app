const mongoose = require('mongoose');


const cpuDataSchema = mongoose.Schema({
  freeMemory: {
    type: Number,
    required: true
  },
  systemUpTime: {
    type: Number,
    required: true
  },
  systemAverageSpeed: {
    type: Number,
    required: true
  },
  systemCPUUtilization: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// eslint-disable-next-line no-multi-assign
const CPU = module.exports = mongoose.model('CpuData', cpuDataSchema);

module.exports.addCpuData = (cpuData, callback) => {
  cpuData.save(callback);
};

module.exports.getLatestData = (callback) => {
  CPU.find({}, null, { sort: { date: -1 }, limit: 10 }, callback);
};
