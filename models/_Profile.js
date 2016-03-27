
module.exports = function(sequelize, DataTypes) {

    var Profile = sequelize.define('Profile', {
        name: {
            type: DataTypes.STRING(50),
            required: true
        },
        isBorn: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            required: true
        },
        unit: {
            type: DataTypes.STRING(10),
            required: true,
            defaultValue: 'week'
        },
        time: {
            type: DataTypes.INTEGER,
            required: true,
            defaultValue: 0
        },
        isMale: {
            type: DataTypes.BOOLEAN,
            required: true,
            defaultValue: false
        }
    }, {
        timestamps: true,
        updateAt: 'updateAt',
        createAt: 'createAt',
        
    });

    return Profile;
}
