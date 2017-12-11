//Contains string for connecting to database. should encrypt in future,
//along with JSON file, as they contain DB user credentials.

var configValues = require('./config');
var mongoose = require('mongoose');

module.exports = {
  getDbConnectionString: function(){
    // connection string: mongodb://<dbuser>:<dbpassword>@ds145019.mlab.com:45019/appxchnge
    return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds145019.mlab.com:45019/appxchnge';
  }
}
