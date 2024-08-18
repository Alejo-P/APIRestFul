// Requerir modulos y/o paquetes
import express from 'express'
import morgan from 'morgan'
import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

// Las exportaciones por defecto dan la posibilñidad de importar modilos con cualquier nombre
import routertour from './routers/tour_routes.js';
import routeruser from './routers/user_routes.js';

// Inicializar express
const app = express();
app.use(morgan("dev"));
dotenv.config(); // Cargar las variables de entorno
app.use(fileUpload(
    {
        useTempFiles: true, // Usar archivos temporales
        tempFileDir: './uploads', // Directorio de archivos temporales
        createParentPath: true // Crear directorio si no existe
    }
)); // Middleware para subir archivos

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Variables
app.set('port', process.env.port || 3000);

// Middlewares
app.use(express.json())

// Rutas
app.get('/', (req, res) => {
    res.send("Servidor encendido!")
})

app.use('/api/v1', routertour)
app.use('/api/users/', routeruser)

export default app; // Exportar app para poder usarlo en otros archivos