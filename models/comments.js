const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Comments extends Model {
        static associate(models) {
            // define association here
            Comments.belongsTo(models.Users, {foreignKey: 'userId'});
            Comments.belongsTo(models.Posts, {foreignKey: 'postId'});
          }
    };
    Comments.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        message: {
            type: DataTypes.TEXT
        },
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
        postId: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "createdAt"
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "updatedAt"
        },
    }, 
    {
        sequelize,
        modelName: "Comments"
    });
    return Comments
};