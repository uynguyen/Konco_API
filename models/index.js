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
      'User',
      'Post'
        ];

  models.forEach(function(model){
    module.exports[model] = sequelize.import(__dirname + '/_' + model);
  });


// describe relationships
(function (m) {

    m.User.hasMany(m.Post);
    m.Post.belongsTo(m.User);


})(module.exports);

sequelize.sync({
   force: true
}).then(function () {
   module.exports.User.create({
       username: 'superman',
       password: 'hackathon',
       claims: 'read-full'
   }).then(function(user){
      module.exports.Post.create({
          title: 'Hello world',
          datepost: new Date(),
          content: 'Welcome!',
          UserId: user.id
      });
   });
});
module.exports.sequelize = sequelize;
