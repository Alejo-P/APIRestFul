// Importar el modulo Router de express
import { Router } from "express";
// Importar el metodo del controlador
import { getAllToursController, getTourByIDController, updateTourByIDController, deleteTourByIDController } from "../controllers/tour_controller.js";
import { createTourController } from "../controllers/tour_controller.js";
import { verifyToken } from '../middlewares/auth.js';


// Crear la instancia de Router
const router = Router()

// Punto 1: Crear la ruta
// Punto 2: invocar al controlador (GET)
router.get("/tours", getAllToursController)

// Punto 1: Crear la ruta
// Punto 2: invocar al controlador (GET)
router.get("/tours/:id", getTourByIDController)

// Punto 1: Crear la ruta
// Punto 2: invocar al controlador (POST)
router.post("/tours", createTourController)

// Punto 1: Crear la ruta
// Punto 2: invocar al controlador (PUT)
router.put("/tours/:id",verifyToken, updateTourByIDController)

// Punto 1: Crear la ruta
// Punto 2: invocar al controlador (DELETE)
router.delete("/tours/:id", deleteTourByIDController)

// Exportar por defecto la variable router (EJS)
export default router