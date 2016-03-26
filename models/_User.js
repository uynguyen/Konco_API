var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {

    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING(30),
            unique: true,
            required: true
        },
        password: {
            type: DataTypes.STRING,
            required: true
        },
        claims: {
            type: DataTypes.STRING(100),
            required: true,
            defaultValue: "read-only"
        }
    }, {
        timestamps: true,
        updateAt: 'updateAt',
        createAt: 'createAt',
        instanceMethods: {
            verifyPassword: function (password, done) {
                return bcrypt.compare(password, this.password, function (err, isMatch) {
                    if (err) return done(err);
                    done(null, isMatch);
                });
            }
        }
    });

    var hashPassword = function (user, options, callback) {
        // Break out if the password hasn't changed
        if (!user.changed('password')) return callback();

        // Password changed so we need to hash it
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return callback(err);

            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) return callback(err);
                user.password = hash;
                callback();
            });
        });
    };


    User.beforeCreate(hashPassword);
    User.beforeUpdate(hashPassword);

    return User;
}
