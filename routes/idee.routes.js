import express from "express";
import IdeeControlleur from "..module.idees/idee.controlleur.js";
import IdeeRepository from "..module.idees/idee.repository.js";
import pool from "../config/db.js"; // ton instance de pool (MySQL2 ou mariadb)

const router = express.Router();
const ideeRepository = new IdeeRepository(pool);
const ideeControlleur = new IdeeControlleur(ideeRepository);

router.post("/", ideeControlleur.createUser);

export default router;