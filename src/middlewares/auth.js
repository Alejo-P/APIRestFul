import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Metodo para firmar y crear el token
const signToken = (payload) => {
    // Retornamos el token firmado
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'});
};

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    // Obtenemos el token del header de la peticion
    const headerToken = req.headers['authorization'];
    // Si no hay token
    if (!headerToken || !headerToken.startsWith('Bearer ')) {
        return res.status(401).json({msg: 'No se ha proporcionado un token!!'});
    }
    // Obtenemos el token sin el prefijo 'Bearer '
    const token = headerToken.split(' ')[1];
    // Verificamos el token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        // Si hay un error
        if (err) {
            return res.status(401).json({msg: 'No autorizado!!'});
        }
        // Si no hay error
        req.user = decoded;
        next();
    });
};

// Exportamos los metodos
export {
    signToken,
    verifyToken
};