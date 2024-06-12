// Requerir modulos y/o paquetes
import express from 'express'
import morgan from 'morgan'

// Las exportaciones por defecto dan la posibilñidad de importar modilos con cualquier nombre
import routertour from './routers/tour_routes.js';
import routeruser from './routers/user_routes.js';

// Inicializar express
const app = express();
app.use(morgan("dev"));

// Variables
app.set('port', process.env.port || 3000);

// Middlewares
app.use(express.json())

// Rutas
app.get('/', (req, res) => {
    res.send("Servidor encendido!")
})

app.use('/api/v1', routertour)
app.use('/api/user/', routeruser)

export default app;
