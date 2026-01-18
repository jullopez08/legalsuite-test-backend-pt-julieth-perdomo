const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Lawyer = require('./Lawyer');

const LegalCase = sequelize.define(
    'LegalCase',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        case_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
            
        },
        plaintiff: {
            type: DataTypes.STRING,
            allowNull: false
        },
        defendant: {
            type: DataTypes.STRING,
            allowNull: false
        },
        case_type: {
            type: DataTypes.ENUM('civil', 'criminal', 'labor', 'commercial'),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'assigned', 'in_progress', 'resolved'),
            defaultValue: 'pending'
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        lawyer_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'lawyers',
                key: 'id'
            }
        }
    },
    {
        timestamps: true,
        underscored: true,
        tableName: 'legal_cases'
    }
)
module.exports = LegalCase;