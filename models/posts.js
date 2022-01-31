const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {
        static associate(models) {
            // define association here
            Posts.belongsTo(models.Posts, {foreignKey: 'userId'});
            Posts.hasMany(models.Comments)
            Posts.hasMany(models.Likes)
          }
    };
    Posts.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },

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
          allowNull: true
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
        modelName: "Posts"
    });
    return Posts
};