const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Lawyer = sequelize.define(
    'Lawyer',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    },
    {
        timestamps: true,
        tableName: 'lawyers'
    }
    

)

module.exports = Lawyer