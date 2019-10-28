/* eslint-disable class-methods-use-this */
const os = require('os');

class CPUDetails {
  getFreeMemory() {
    return os.freemem();
  }

  getSystemUpTime() {
    return os.uptime();
  }

  getCPUAverageSpeed() {
    let totalSpeed = 0;
    const cpus = os.cpus();
    const cpuLength = cpus.length;

    for (let i = 0; i < cpuLength; i += 1) {

      totalSpeed += cpus[i].speed;
    }
    return totalSpeed / cpuLength;
  }

  getCPUUtilization(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
module.exports = CPUDetails;
