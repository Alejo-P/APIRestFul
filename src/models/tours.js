let URL = "http://localhost:4000/tours";

// Crear un objeto
const toursModels = {
    // Crear un metodo para obtener todos los tours
    async getAllToursModel(){
        // Obtener los registros de la base de datos
        const peticion = await fetch(URL)
        const tours = await peticion.json()
        // Retornar los registros
        return tours
    },

    // Crear un metodo para guardar en la base de datos
    // 1: Enviar los datos a la base de datos
    // 2: Retornar la respuesta al controlador
    async createTourModel(newTour){
        //Pinto 1: Enviar los datos a la base de datos

        const peticion = await fetch(URL, // URL de la base de datos
        {
            method: "POST", // Metodo de solicitud
            body: JSON.stringify(newTour), // Cuerpo de la solicitud
            headers: {
                "Content-Type": "application/json"
            } // Cabeceras de solicitud
        }) // Hacer una solucutud fetch con cabeceras de solicitud
        const result = await peticion.json(); // Convertir la respuesta en un objeto JSON
        // Punto 2: Retornar la respuesta
        return result // Retornar la respuesta
    },

    // Crear un metodo para obtener un tour por su ID
    // 1: Enviar el ID a la base de datos
    // 2: Retornar la respuesta al controlador
    async getTourByIDModel(id){
        // Punto 1: Enviar el ID a la base de datos
        const peticion = await fetch(`${URL}/${id}`) // URL de la base de datos
        if (! peticion.ok) {
            return {error:"No se pudo obtener el tour"};
        }
        const tour = await peticion.json(); // Convertir la respuesta en un objeto JSON
        // Punto 2: Retornar la respuesta
        return tour;
    },

    // Crear un metodo para actualizar un tour por su ID
    // 1: Enviar los datos a la base de datos
    // 2: Retornar la respuesta al controlador
    async updateTourModel(id, updatedTour){
        const verificador = await fetch(`${URL}/${id}`);
        if (! verificador.ok) {
            return {error:"No se pudo obtener el tour"};
        }
        // Punto 1: Enviar los datos a la base de datos
        const peticion = await fetch(`${URL}/${id}`, // URL de la base de datos
        {
            method: "PUT", // Metodo de solicitud
            body: JSON.stringify(updatedTour), // Cuerpo de la solicitud
            headers: {
                "Content-Type": "application/json"
            } // Cabeceras de solicitud
        }) // Hacer una solucutud fetch con cabeceras de solicitud
        const result = await peticion.json(); // Convertir la respuesta en un objeto JSON
        // Punto 2: Retornar la respuesta
        return result // Retornar la respuesta
    },

    // Crear un metodo para eliminar un tour por su ID
    // 1: Enviar el ID a la base de datos
    // 2: Retornar la respuesta al controlador
    async deleteTourModel(id){
        const verificador = await fetch(`${URL}/${id}`);
        if (! verificador.ok) {
            return {error:"No se pudo obtener el tour"};
        }
        // Punto 1: Enviar el ID a la base de datos
        const peticion = await fetch(`${URL}/${id}`, // URL de la base de datos
        {
            method: "DELETE", // Metodo de solicitud
        }) // Hacer una solicutud fetch con cabeceras de solicitud
        return {msg: "Tour eliminado correctamente!!!!"} // Retornar la respuesta
    }
};

// Exportar el objeto (modelo) creado (EJS)
export default toursModels;
