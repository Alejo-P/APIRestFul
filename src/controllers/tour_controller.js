// Importar el modelo creado
import toursModels from "../models/tours.js"
import { v4 as uuidv4 } from 'uuid'; // Importar la funcion para generar un id unico
import {v2 as cloudinary} from 'cloudinary'; // Importar el modulo de cloudinary
import fs from "fs-extra";

// Crear un controlador para enviar la informacion en formato JSON
const getAllToursController = async (req, res) => {
    try {
        const tours = await toursModels.getAllToursModel();
        res.status(200).json(tours); // Enviar respuesta al cliente
    } catch (error) {
        res.status(5500).json(error);
    }
}

// Controlador para crear un nuevo tour
const createTourController = async (req, res) => {
    // Punto 1: Creacion de un objeto con los datos enviados por el cliente
    const newTour = {
        id: uuidv4(),
        ...req.body // Operador Spread
    }
    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(req.files.image.tempFilePath, {folder:"tours"}); // Subir la imagen a Cloudinary
        newTour.image = cloudinaryResponse.secure_url; // Punto 1: Agregar la URL de la imagen al objeto
        newTour.public_id = cloudinaryResponse.public_id // Punto 2: Agregar el ID de la imagen al objeto
        await fs.unlink(req.files.image.tempFilePath); // Eliminar la imagen del servidor
        // Punto 2: Mandar a la base de datos el nuevo tour
        const result = await toursModels.createTourModel(newTour);
        res.status(201).json(result); // Punto 3: Enviar respuesta al cliente
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// Controlador para crear un nuevo tour
const getTourByIDController = async (req, res) => {
    try {
        // Punto 1: Obtener  el ID de la URL
        const id = req.params.id.toString();
        // Punto 2: Enviar el ID a la base de datos
        const tour = await toursModels.getTourByIDModel(id);
        const status = tour.error ? 404 : 200;
        res.status(status).json(tour); // Punto 3: Enviar respuesta al cliente
    } catch (error) {
        res.status(500).json(error);
    }
}

// Controlador para actualizar un tour por su ID
const updateTourByIDController = async (req, res) => {
    try {
        // Punto 1: Obtener  el ID de la URL
        const id = req.params.id.toString();
        // Punto 2: Enviar el ID a la base de datos
        const tour = await toursModels.updateTourModel(id, req.body);
        const status = tour.error ? 404 : 200;
        res.status(status).json(tour); // Punto 3: Enviar respuesta al cliente
    } catch (error) {
        res.status(500).json(error);
    }
}

// Controlador para eliminar un tour por su ID
const deleteTourByIDController = async (req, res) => {
    try {
        // Punto 1: Obtener  el ID de la URL
        const id = req.params.id.toString(); // Obtener el ID de la URL
        // Punto 2: Enviar el ID a la base de datos
        const tourFound = await toursModels.getTourByIDModel(id);
        if (!tourFound.error) {
            await cloudinary.uploader.destroy(tourFound.public_id); // Eliminar la imagen de Cloudinary
        }
        const tour = await toursModels.deleteTourModel(id);
        const status = tour.error ? 404 : 200;
        res.status(status).json(tour); // Punto 3: Enviar respuesta al cliente
    } catch (error) {
        res.status(500).json(error);
    }
}

// Exportacion nombrada el objeto (modelo) creado (EJS)
export{
    getAllToursController,
    createTourController,
    getTourByIDController,
    updateTourByIDController,
    deleteTourByIDController
}