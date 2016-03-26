var Sequelize = require('sequelize');

var dbconfig = require('../config/mysql');

var sequelize = new Sequelize(dbconfig.db_name, dbconfig.username, dbconfig.password, dbconfig.options);


//Checking connection status
sequelize.authenticate().then(function (err) {
    if (err) {
        console.log('There is connection in ERROR');
    } else {
        console.log('Connection has been established successfully');
    }
});


var models = [
      'User'
        ];

  models.forEach(function(model){
    module.exports[model] = sequelize.import(__dirname + '/_' + model);
  });

sequelize.sync({
   force: true
}).then(function () {
   module.exports.User.create({
       username: 'superadmin',
       password: 'randompass',
       claims: 'read-full, addUser, getUser'
   });
});
module.exports.sequelize = sequelize;
