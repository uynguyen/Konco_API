

module.exports = function (sequelize, DataTypes) {

    var Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING(100),
            required: true
        },
        datepost: {
            type: DataTypes.DATE,
            required: true
        },
        content: {
            type: DataTypes.TEXT,
            required: true
        }
    }, {
        timestamps: true,
        updateAt: 'updateAt',
        createAt: 'createAt'
    });


    return Post;
}
