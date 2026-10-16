const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Curso = require('./Curso');
const Usuario = require('./Usuario');

const Inscripcion = sequelize.define('Inscripcion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  curso_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_inscripcion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  estado: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'activo',
  },
}, {
  tableName: 'inscripciones',
  timestamps: false,
});

Inscripcion.belongsTo(Curso, { foreignKey: 'curso_id', as: 'curso' });
Inscripcion.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

module.exports = Inscripcion;