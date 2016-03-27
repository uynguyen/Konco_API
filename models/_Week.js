
module.exports = function(sequelize, DataTypes) {

    var Week = sequelize.define('Week', {
        name: {
            type: DataTypes.STRING(10),
            unique: true,
            required: true
        },    
        info: {
            type: DataTypes.TEXT,
            required: false
        }
    }, {
        timestamps: true,
        updateAt: 'updateAt',
        createAt: 'createAt',
        
    });

    return Week;
}
