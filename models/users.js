"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            // define association here
            Users.hasMany(models.Posts, {foreignKey: 'userId', allowNull: false, onDelete: 'cascade', onUpdate: 'cascade'});
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
            type: DataTypes.TEXT,
            allowNull: true,
        },
        is_admin: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: "0",
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