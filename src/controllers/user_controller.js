import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';
import userModel from '../models/users.js';
import { signToken } from '../middlewares/auth.js';

const registerUserController = async (req, res) => {
    const {password, ...otherDataUser} = req.body; // Desestructuramos el password y el resto de datos del usuario
    // Creamos un nuevo usuario con un id único
    const newUser = {
        id: uuidv4(),
        ...otherDataUser, // Incluimos el resto de datos del usuario (Operador Spread)
        password: await bcrypt.hash(password, 10) // Encriptamos la contraseña
    };
    try {
        const data = await userModel.registerUserModel(newUser); // Llamamos al modelo para registrar el usuario
        res.status(201).json({
            data
        }); // Respondemos con el usuario creado
    } catch (error) {
        
        res.status(500).json({msg: error.message});
    }
};

const loginUserController = async (req, res) => {
    const {username, password} = req.body; // Desestructuramos el username y el password
    try {
        const data = await userModel.loginUserModel(username, password); // Llamamos al modelo para loguear al usuario
        const token = signToken(data); // Firmamos el token con el id del usuario
        delete data.password; // Eliminamos la contraseña del usuario
        res.status(200).json({
            data,
            token
        }); // Respondemos con el usuario logueado
    } catch (error) {
        res.status(500).json(error);
    }
};

export {
    registerUserController,
    loginUserController
};