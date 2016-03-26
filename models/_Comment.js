module.exports = function(sequelize, DataTypes) {

    var Comment = sequelize.define('Comment', {
        content: {
            type: DataTypes.TEXT,
            required: true
        },
        datecomment: {
            type: DataTypes.DATE,
            required: true
        }
    }, {
        timestamps: true,
        updateAt: 'updateAt',
        createAt: 'createAt'
    });


    return Comment;
}
