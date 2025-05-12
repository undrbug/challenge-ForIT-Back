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

export const getAll = (req, res) => {
    console.log("getAll")
    //res.json(tareas)
    res.status(200).json({
        message: "Tareas obtenidas correctamente",
        data: tareas,
        total: tareas.length
    })        
}

export const createOne = (req, res) => {
    console.log("createOne")
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
}

export const updateOne = (req, res) => {
    console.log("updateOne")
    const { id } = req.params
    const { title, description, completed } = req.body
    const taskIndex = tareas.findIndex(task => task.id === parseInt(id))
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
}

export const deleteOne = (req, res) => {
    console.log("deleteOne")
    const { id } = req.params
    const taskIndex = tareas.findIndex(task => task.id === parseInt(id))
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
}