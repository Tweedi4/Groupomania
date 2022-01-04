const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {}
    Posts.init({
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image_url: {
          type: DataTypes.TEXT,
          allowNull: false
      },
    }, 
    {
        sequelize,
        modelName: "Posts"
    })
    return Posts
}