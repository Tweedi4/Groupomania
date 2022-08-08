const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Likes extends Model {
        static associate(models) {
            // define association here
            Likes.belongsTo(models.Users, {foreignKey: 'userId', allowNull: false, onDelete: 'cascade', onUpdate: 'cascade'});
            Likes.belongsTo(models.Posts, {foreignKey: 'postId', allowNull: false, onDelete: 'cascade', onUpdate: 'cascade'});
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