

module.exports = function (sequelize, DataTypes) {

    var View = sequelize.define('View', {
        vote: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            required: true
        }
    }, {
        timestamps: true,
        updateAt: 'updateAt',
        createAt: 'createAt'
    });


    return View;
}
