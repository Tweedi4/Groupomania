const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Comments extends Model {}
    Comments.init({
        comment: {
            type: DataTypes.TEXT
        },
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
        postsId: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
    }, 
    {
        sequelize,
        modelName: "Comments"
    })
    return Comments
}