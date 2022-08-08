const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Comments extends Model {
        static associate(models) {
            // define association here
            Comments.belongsTo(models.Users, {foreignKey: 'userId', allowNull: false, onDelete: 'cascade', onUpdate: 'cascade'});
            Comments.belongsTo(models.Posts, {foreignKey: 'postId', allowNull: false, onDelete: 'cascade', onUpdate: 'cascade'});
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
            field: "userId",
            references: {
            key: "id",
            model: "Users"
      }

          },
        postId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: "postId",
            references: {
            key: "id",
            model: "Posts"
      }

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
