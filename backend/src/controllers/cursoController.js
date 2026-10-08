const Curso = require('../models/Curso');

const obtenerCursos = async (req, res, next) => {
    try{
        const cursos = await Curso.findAll();
        return res.json(cursos);
    } catch (error) {
        next(error);
    }
};

const obtenerCursoPorId = async (req, res, next) => {
    try{
        const { id } = req.params;
        const curso = await Curso.findByPk(id);

        if(!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerCursos,
    obtenerCursoPorId
};