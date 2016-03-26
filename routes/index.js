var express = require('express');
var models = require('../models');
var View = models.View;
var Post = models.Post;
var Comment = models.Comment;
var Profile = models.Profile;
var Period = models.Period;
var User = models.User;
var Week = models.Week;
var router = express.Router();
var multer = require("multer");


// router.all("/*", function(req, res, next){
//     if (req.headers.user_id){
//         models.User.find({where:{fbid:req.headers.user_id}}).then(function(user){
//             if (user != null)
//                 return next();
//             else
//                return res.status(401).json({message: "fbid is invalid!"});
//         });
//     }
//     else
//     {
//        return  res.status(401).json({message: "miss fbid"});
//     }
// });



router.get("/users", function(req, res, next) {
    models.User.findAll().then(function(data) {
        res.json({
            users: data
        });
    });
});

router.get("/user/:fbid", function(req, res, next) {
    models.User.find({
        where: {
            fbid: req.params.fbid
        }
    }).then(function(data) {
        if (data == null) {
            res.json({
                message: "error cannot find user"
            });
        } else {
            res.json({
                user: data
            });
        }
    });
});

router.post("/user", function(req, res, next) {
    models.User.find({
        where: {
            fbid: req.body.user.fbid
        }
    }).then(function(user) {
        if (user == null) {
            models.User.create({
                fbid: req.body.user.fbid,
                fullname: req.body.user.fullname,
                avatarUrl: req.body.user.avatarUrl
            }).then(function(newUser) {
                res.json({
                    message: "Create user successfully!"
                });
            });
        } else {
            res.json({
                message: "username invalid!"
            });
        }
    });
});


router.get("/posts", function(req, res, next) {
    models.Post.findAll({
        include: [{
            all: ['BelongsTo', 'HasMany'],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    }).then(function(data) {
        return res.json({
            num_post: data.length,
            posts: data
        });
    });
});

router.get("/post/:id", function(req, res, next) {
    models.Post.find({
        where: {
            id: req.params.id
        },
        include: [{
            all: ['BelongsTo', 'HasMany'],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    }).then(function(data) {
        return res.json({
            post: data
        });
    });
});

router.post("/post", function(req, res, next) {
    Post.create({
        title: req.body.post.title,
        datepost: new Date(),
        content: req.body.post.content,
        num_view: 1,
        num_vote: 0,
        UserId: req.body.post.UserId
    }).then(function(post) {
        View.create({
            UserId: post.UserId,
            PostId: post.id
        }).then(function(view) {
            res.json({
                success: 'Create post successfully!'
            });
        });
    });
});

router.put("/post/:id", function(req, res, next) {
    Post.find({
        where: {
            id: req.params.id
        }
    }).then(function(post) {
        if (post == null) {
            return res.json({
                message: "Post not found!"
            });
        } else {
            post.update({
                content: req.body.post.content
            }).then(function() {
                res.json({
                    message: "Update post successfully!"
                });
            });
        }
    });
});

router.delete("/post/:id", function(req, res, next) {
    Post.find({
        where: {
            id: req.params.id
        }
    }).then(function(post) {
        if (post == null) {
            return res.json({
                message: "Post not found!"
            });
        } else {
            post.destroy().then(function() {
                res.json({
                    message: "Delete post successfully!"
                });
            });
        }
    });
});

router.get("/views", function(req, res, next) {
    models.View.findAll().then(function(data) {
        res.json({
            views: data
        });
    });
});

router.post("/view", function(req, res, next) {
    View.findOrCreate({
            where: {
                UserId: req.body.view.UserId,
                PostId: req.body.view.PostId
            },
            defaults: {
                UserId: req.body.view.UserId,
                PostId: req.body.view.PostId
            }
        })
        .spread(function(view, created) {
            if (created) {
                Post.find({
                    where: {
                        id: req.body.view.PostId
                    }
                }).then(function(post) {
                    post.update({
                        num_view: post.num_view + 1
                    }).then(function() {
                        res.json({
                            message: "View post added"
                        });
                    });
                });
            } else {
                res.json({
                    message: "Viewed"
                });
            }

        });
});

router.post("/vote", function(req, res, next) {
    View.find({
            where: {
                UserId: req.body.view.UserId,
                PostId: req.body.view.PostId
            }
        })
        .then(function(view) {
            if (!view.vote) {
                view.update({
                    vote: true
                }).then(function() {
                    Post.find({
                        where: {
                            id: req.body.view.PostId
                        }
                    }).then(function(post) {
                        post.update({
                            num_vote: post.num_vote + 1
                        }).then(function() {
                            res.json({
                                message: "Vote successfully!"
                            });
                        });
                    });


                });
            } else {
                res.json({
                    message: "Voted!"
                });
            }
        });
});

router.post("/unvote", function(req, res, next) {
    View.find({
            where: {
                UserId: req.body.view.UserId,
                PostId: req.body.view.PostId
            }
        })
        .then(function(view) {
            if (view.vote) {
                view.update({
                    vote: false
                }).then(function() {
                    Post.find({
                        where: {
                            id: req.body.view.PostId
                        }
                    }).then(function(post) {
                        post.update({
                            num_vote: post.num_vote - 1
                        }).then(function() {
                            res.json({
                                message: "Unvote successfully!"
                            });
                        });
                    });


                });
            } else {
                res.json({
                    message: "Unvoted!"
                });
            }
        });
});

router.post("/comment", function(req, res, next) {
    Comment.create({
        content: req.body.comment.content,
        UserId: req.body.comment.UserId,
        PostId: req.body.comment.PostId,
        datecomment: new Date()
    }).then(function(comment) {
        res.json({
            message: "Post comment successfully!"
        });
    });
});

router.post("/profile", function(req, res, next) {
    Profile.create({
        name: req.body.profile.name,
        start: req.body.profile.start,
        PeriodId: req.body.profile.PeriodId
    }).then(function(profile) {
        if (profile != null)
        {
            User.find({where:{fbid: req.body.profile.user_id}})
            .then(function(user){
                if (user != null)
                {
                    profile.UserId = user.id;
                     res.status(200).json({
                         message: "Add profile successfully!"
            });
                }
                else
                {
                     res.status(500).json({
                message: "Create profile error!"
            });
                }

            });
           
        }
       else
       {
            res.status(500).json({
                message: "Create profile error!"
            });
       } 
    });
});


router.post("/week", function(req, res, next) {
    Week.create({
        name: req.body.week.name,
        info: req.body.week.info
    }).then(function(week) {
        if (week != null)
        {
           
             return  res.status(200).json({
                         message: "Add week successfully!"
            });
                
        }
       else
       {
            res.status(500).json({
                message: "Create week error!"
            });
       } 
    });
});

router.get("/weeks", function(req, res, next) {
   Week.findAll().then(function(weeks){
        if (weeks != null){
            return res.status(200).json({weeks: weeks});
        }
        else
        {
            return res.status(500).json({message:"get week error"});
        }
   });
});

router.get("/week/:name", function(req, res, next) {
   Week.find({where:{name:req.params.name}}).then(function(week){
        if (week != null){
            return res.status(200).json({week: week});
        }
        else
        {
            return res.status(500).json({message:"get week error"});
        }
   });
});






// ==========================================================================
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage}).single('userPhoto');


router.post('/uploads', function(req, res, next){

    upload(req, res, function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});
// ==========================================================================
module.exports = router;
