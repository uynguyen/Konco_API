
module.exports = function(sequelize, DataTypes) {

    var Status = sequelize.define('Status', {
        height: {
            type: DataTypes.DOUBLE,
            required: true
        },
        weight: {
            type: DataTypes.DOUBLE,
            required: true
        },
        date: {
            type: DataTypes.DATE,
            required: true
        }
    }, {
        timestamps: true,
        updateAt: 'updateAt',
        createAt: 'createAt',
        
    });

    return Status;
}
