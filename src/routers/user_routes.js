import { Router } from "express";
import { loginUserController, registerUserController } from "../controllers/user_controller.js";

// Instabcia de Router
const router = Router();

// Rutas para el registro y login de usuarios
router.post("/register", registerUserController);
router.post("/login", loginUserController);

export default router;