var Sequelize = require('sequelize');

var dbconfig = require('../config/mysql');

var sequelize = new Sequelize(dbconfig.db_name, dbconfig.username, dbconfig.password, dbconfig.options);


//Checking connection status
sequelize.authenticate().then(function(err) {
    if (err) {
        console.log('There is connection in ERROR');
    } else {
        console.log('Connection has been established successfully');
    }
});


var models = [
    'User',
    'Post',
    'View',
    'Comment',
    'Profile',
    'Week',
    'Status',
    'Standard'
];

models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/_' + model);
});


// describe relationships
(function(m) {

    m.User.hasMany(m.Post);
    m.Post.belongsTo(m.User);

    m.View.belongsTo(m.User);
    m.View.belongsTo(m.Post);
    m.User.hasOne(m.View);
    m.Post.hasMany(m.View);

    m.Comment.belongsTo(m.Post);
    m.Comment.belongsTo(m.User);

    m.User.hasMany(m.Comment);
    m.Post.hasMany(m.Comment);

    m.Profile.belongsTo(m.User);
    m.User.hasMany(m.Profile);

    m.Status.belongsTo(m.Profile);
    m.Profile.hasMany(m.Status);
})(module.exports);

// if (false)
// sequelize.sync({
//     force: true
// }).then(function() {
//     module.exports.Standard.create({
//         height: '25-30',
//         weight: '4-4.5',
//         monthsold: 24,
//         isMale: false
//     });

//     module.exports.User.create({
//         fbid: '1001',
//         fullname: 'Super Women',
//         avatarUrl: 'http://www.yes24.vn/Upload/ProductImage/mommy/1039809_M.jpg'
//     }).then(function(user) {

//         module.exports.Profile.create({
//             UserId: user.id,
//             name: "Nguyễn Thị Long Uy",
//             isBorn: true,
//             time: 24,
//             isMale: false
//         }).then(function(profile){
//             module.exports.Status.create({
//                 ProfileId: profile.id,
//                 height: 30,
//                 weight: 4.5,
//                 date: new Date()
//             });
//         });

//         module.exports.Post.create({
//             title: 'Hello world',
//             datepost: new Date(),
//             content: 'Welcome!',
//             num_view: 1,
//             num_vote: 0,
//             UserId: user.id
//         }).then(function(post) {
//             module.exports.View.create({
//                 UserId: user.id,
//                 PostId: post.id
//             });
//             module.exports.Comment.create({
//                 content: "Good post!",
//                 datecomment: new Date(),
//                 PostId: post.id,
//                 UserId: user.id
//             });
//         });
//         module.exports.Post.create({
//             title: 'Hello world 2',
//             datepost: new Date(),
//             content: 'Welcome 2!',
//             num_view: 1,
//             num_vote: 0,
//             UserId: user.id
//         }).then(function(post) {
//             module.exports.View.create({
//                 UserId: user.id,
//                 PostId: post.id
//             });
//         });
//         module.exports.Post.create({
//             title: 'Hello world 3',
//             datepost: new Date(),
//             content: 'Welcome 3!',
//             num_view: 1,
//             num_vote: 1,
//             UserId: user.id
//         }).then(function(post) {
//             module.exports.View.create({
//                 UserId: user.id,
//                 PostId: post.id,
//                 vote: true
//             });
//         });
//     });
// });
// else
//     sequelize.sync({force:true});

module.exports.sequelize = sequelize;
