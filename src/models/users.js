import bcrypt from 'bcrypt'

// URL de la API de usuarios
const URL = 'http://localhost:4000/users';
// Objeto para el registro de los usuarios
const userModel = {

    async registerUserModel(newUser){
        // Peticion POST para registrar un nuevo usuario
        const peticcion = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        });
        const data = await peticcion.json();
        // Retornamos la respuesta del servidor
        return data;
    },
    async loginUserModel(username, password){
        // Pinto 1: Peticion GET para obtener los usuarios
        const peticion = await fetch(URL);
        const users = await peticion.json();
        // Comprobar si el usuario existe
        const user = users.find(user => user.username === username);
        if (!user) {
            return {msg: 'Usuario o contraseña incorrectos'};
        }
        // Comprobar si la contraseña es correcta
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (user && passwordMatch) {
            return user;
        } else {
            return {msg: 'Usuario o contraseña incorrectos'};
        }
    },
}

export default userModel;