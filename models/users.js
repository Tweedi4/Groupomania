"use strict";

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {}
    Users.init({
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
    }, 
    {
        sequelize,
        modelName: "Users"
    })
    return Users
}