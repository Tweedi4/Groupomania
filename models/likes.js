const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Likes extends Model {
        static associate(models) {
            // define association here
            Likes.belongsTo(models.Users, {foreignKey: 'userId'});
            Likes.belongsTo(models.Posts, {foreignKey: 'postId'});
          }   
    };
    Likes.init({
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
        postId: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
    }, 
    {
        sequelize,
        modelName: "Likes"
    });
    return Likes
};