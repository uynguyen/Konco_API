
module.exports = function(sequelize, DataTypes) {

    var Standard = sequelize.define('Standard', {
        height: {
            type: DataTypes.STRING(20),
            required: true
        },
        weight: {
            type: DataTypes.STRING(20),
            required: true
        },
        monthsold: {
            type: DataTypes.INTEGER
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

    return Standard;
}
