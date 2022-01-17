"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            // define association here
            Users.hasMany(models.Posts, {foreignKey: 'userId'});
          }
    };
    Users.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: "id",
          },
      
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
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
        modelName: "Users"
    });
    return Users
};