import express from 'express'
import { getAll, createOne, updateOne, deleteOne } from '../controllers/todo.controllers.js'

const router = express.Router()

// Definición de las rutas para las tareas
router.get('/tasks', getAll)
router.post('/tasks', createOne)
router.put('/tasks/:id', updateOne)
router.delete('/tasks/:id', deleteOne)

export default router;