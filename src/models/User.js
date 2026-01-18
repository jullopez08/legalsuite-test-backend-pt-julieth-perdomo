// const {  DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
            
        },
        username:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'operator'),
            defaultValue: 'operator'
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    },
    {
        timestamps: true,
        underscored: true,
        tableName: 'users'
    }
)

module.exports = User;