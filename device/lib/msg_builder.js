const CPU = require('./cpu_details');

const cpu = new CPU();
module.exports = function () {
  return {
    freeMemory: cpu.getFreeMemory(),
    systemUpTime: cpu.getSystemUpTime(),
    systemAverageSpeed: cpu.getCPUAverageSpeed(),
    systemCPUUtilization: cpu.getCPUUtilization(5,100),
    date: new Date(),
  };
};
