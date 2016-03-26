
module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define('User', {
        fbid: {
            type: DataTypes.STRING(50),
            unique: true,
            required: true
        },
        fullname: {
            type: DataTypes.STRING(50),
            defaultValue: 'Họ và tên',
            required: false
        },     
        avatarUrl: {
            type: DataTypes.STRING(255),
            required: false
        }
    }, {
        timestamps: true,
        updateAt: 'updateAt',
        createAt: 'createAt',
        
    });

    return User;
}
