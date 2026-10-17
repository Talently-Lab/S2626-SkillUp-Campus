const Curso = require('../models/Curso');

const obtenerCursos = async (req, res, next) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { rows: cursos, count: total } = await Curso.findAndCountAll({
            where: { activo: true },
            order: [['id','ASC']],
            limit,
            offset
        });

        const totalPages = Math.ceil(total / limit);

        return res.json({
            data: cursos,
            pagination: {
                page,
                limit,
                total,
                totalPages
            }
        });
    } catch (error) {
        next(error);
    }
};

const obtenerCursoPorId = async (req, res, next) => {
    try{
        const { id } = req.params;
        const idNum = Number(id);

        // Si el id de la URL no se puede interpretar como número, devolvemos 404
        const curso = Number.isNaN(idNum)
            ? null 
            : await Curso.findOne({ where: { id: idNum, activo: true } });

        if(!curso) {
            const error = new Error('Curso no encontrado');
            error.status = 404;
            return next(error);
        }

        return res.json(curso);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerCursos,
    obtenerCursoPorId
};
