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
    });
    return Comments
};