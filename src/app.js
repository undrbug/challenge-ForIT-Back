import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import routerToDos from './routes/todo.routes.js'

//instanciamos express
const app = express();

dotenv.config();

app.use(express.urlencoded({ extended: false }));


app.use(cors())
app.use(express.json())


//establecemos las rutas
app.use('/api', routerToDos)
app.use((req, res, next) => {
    res.status(404).json({ message: "Recurso o endpoint no encontrado. Verifica la URL." });
})

app.use((err, req, res, next) => {
    console.error("Error no capturado:", err.stack || err.message || err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Ha ocurrido un error interno en el servidor.";

    res.status(statusCode).json({
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

//establecemos el puerto de escucha
const PORT = process.env.PORT || 3000;

//iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});