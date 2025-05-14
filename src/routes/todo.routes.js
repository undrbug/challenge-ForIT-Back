import express from 'express'
import { getAll, createOne, updateOne, deleteOne, getOne } from '../controllers/todo.controllers.js'
import { body, param, validationResult } from 'express-validator'

const router = express.Router()

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

//Rutas para las tareas
router.get('/tasks', getAll)

router.get('/tasks/:id',
    [
        //validacion de id que viene en la url
        param('id').isString().withMessage('El ID es obligatorio.')
    ],
    handleValidationErrors,
    getOne
)

router.post('/tasks',
    [
        // Validacion title, description, no deben estar vacío
        body('title').trim().notEmpty().withMessage('El título es obligatorio.'),
        body('description').trim().notEmpty().withMessage('La descripción es obligatoria.')
    ],
    handleValidationErrors,
    createOne
)

router.put('/tasks/:id',
    [
        //validacion de id que viene en la url, validacion de title, description y completed campos obligatorios
        param('id').isString().notEmpty().withMessage('El ID es obligatorio.'),
        body('title').trim().notEmpty().withMessage('El título es obligatorio.'),
        body('description').trim().notEmpty().withMessage('La descripción es obligatoria.'),
        body('completed').isBoolean().withMessage('El estado de finalización es obligatorio.')
    ],
    handleValidationErrors,
    updateOne
)

router.delete('/tasks/:id',
    [
        param('id').isString().withMessage('El ID es obligatorio.')
    ],
    handleValidationErrors,
    deleteOne
)

export default router;