import express from "express";
import UserController from "../module.utilisateurs/utilisateur.controller.js";
import UserRepository from "../module.utilisateurs/utilisateur.repository.js";
import pool from "../config/db.js";

const router = express.Router();
const userRepository = new UserRepository(pool);
const userController = new UserController(userRepository);

router.post("/", userController.createUser);
router.patch("/:id", userController.patchUser);
router.delete("/:id", userController.deleteUser);

export default router;