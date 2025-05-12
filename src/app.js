import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import routerToDos from './routes/todo.routes.js'

//instanciamos express
const app = express();

dotenv.config();

app.use(express.urlencoded({ extended: false }));

//establecemos el puerto de escucha
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())


//establecemos las rutas
app.use('/api', routerToDos)
app.use((req, res, next) => {
    res.send("eeeeerrrrr 404")
})

//iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});