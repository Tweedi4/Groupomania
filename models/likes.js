const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Likes extends Model {}
    Likes.init({
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
        modelName: "Likes"
    })
    return Likes
}