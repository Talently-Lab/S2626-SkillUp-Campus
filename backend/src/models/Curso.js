const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Curso = sequelize.define('Curso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    titulo: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El título es obligatorio.'
            }
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    cupo_maximo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: {
                args: [1],
                msg: 'El cupo máximo debe ser al menos 1.'
            }
        }
    }, 
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
    }, {
        tableName: 'cursos',
        timestamps: false
});

module.exports = Curso;