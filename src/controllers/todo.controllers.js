//Estructura recomendada de una tarea
// const Task = {
//     id: string,
//     title: string,
//     description: string,
//     completed: Boolean,
//     createdAt: Date
// }

// const ArrCargado = [
//     {
//         id: 1,
//         title: "Tarea 1",
//         description: "Descripción de la tarea 1",
//         completed: false,
//         createdAt: new Date()
//     },
//     {
//         id: 2,
//         title: "Tarea 2",
//         description: "Descripción de la tarea 2",
//         completed: true,
//         createdAt: new Date()
//     },
//     {
//         id: 3,
//         title: "Tarea 3",
//         description: "Descripción de la tarea 3",
//         completed: false,
//         createdAt: new Date()
//     }
// ]

//array para almacenamiento temporal de las tareas
let tareas = []

export const getAll = (req, res, next) => {
    try {
        //res.json(tareas)
        res.status(200).json({
            message: "Tareas obtenidas correctamente",
            data: tareas,
            total: tareas.length
        })
    } catch (error) {
        console.error("Error al obtener las tareas:", error)
        res.status(500).json({
            message: "Error al obtener las tareas",
            error: error.message
        })
    } finally {
        console.log("getAll completed")
    }
}

export const createOne = (req, res, next) => {
    try {
        const { title, description } = req.body
        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            completed: false,
            createdAt: new Date()
        }
        tareas.push(newTask)
        res.status(201).json({
            message: "Tarea creada correctamente",
            data: newTask
        })
    } catch (error) {
        console.error("Error al crear la tarea:", error)
        res.status(500).json({
            message: "Error al crear la tarea",
            error: error.message
        })
    } finally {
        console.log("createOne completed")
    }
}

export const updateOne = (req, res, next) => {
    try {
        const { id } = req.params
        const { title, description, completed } = req.body
        const taskIndex = tareas.findIndex(task => task.id === id)
        if (taskIndex !== -1) {
            tareas[taskIndex] = { ...tareas[taskIndex], title, description, completed }
            res.status(200).json({
                message: "Tarea actualizada correctamente",
                data: tareas[taskIndex]
            })
        } else {
            res.status(404).json({
                message: "Tarea no encontrada"
            })
        }
    } catch (error) {
        console.error("Error al actualizar la tarea:", error)
        res.status(500).json({
            message: "Error interno al actualizar la tarea",
            error: error.message
        })
    } finally {
        console.log("updateOne completed")
    }
}

export const deleteOne = (req, res, next) => {
    try {
        const { id } = req.params
        const taskIndex = tareas.findIndex(task => task.id === id)
        if (taskIndex !== -1) {
            tareas.splice(taskIndex, 1)
            res.status(200).json({
                message: "Tarea eliminada correctamente"
            })
        } else {
            res.status(404).json({
                message: "Tarea no encontrada"
            })
        }
    } catch (error) {
        console.error("Error al eliminar la tarea:", error)
        res.status(500).json({
            message: "Error al eliminar la tarea",
            error: error.message
        })
    } finally {
        console.log("deleteOne completed")
    }   
}