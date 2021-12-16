const tedious = require('tedious');
const Connection = tedious.Connection;
const Request = tedious.Request;

const sqlDBService{
    constructor(storedProc, config){
      this.storedProc = storedProc;
      this.config = config;
    }
  
    getConnectionObj(){
      return new Connection(this.config);
    }
  
    getConnection(connection, retriesLeft = 5, interval = 5000){
      return new Promise((resolve, reject) => {
        connection.on('connect', (err) => {
          if(err){
            setTimeout(() => {
              if(retriesLeft == 1){
                reject();
                return;
              } else{
                this.getConnection(this.getConnectionObject(), retriesLeft - 1, interval).then(resolve, reject);
              }
            }, interval);
          } else{
            resolve();
          }
          
        });
      });
    }
  

}
