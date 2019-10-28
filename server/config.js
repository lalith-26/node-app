const config = {
  databaseURL: process.env.mongoDBURL || 'mongodb://localhost:27017/TestDB',
  tokenSecret: process.env.tokenSecret || 'lalith',
}
module.exports = config;
