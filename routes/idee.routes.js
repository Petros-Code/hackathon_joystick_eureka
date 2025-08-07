import express from "express";
import IdeeControlleur from "../module.idees/idee.controlleur.js";
import IdeeRepository from "../module.idees/idee.repository.js";
import pool from "../config/db.js"; 

const router = express.Router();
const ideeRepository = new IdeeRepository(pool);
const ideeControlleur = new IdeeControlleur(ideeRepository);

router.post("/", ideeControlleur.createIdee);
router.get("/", ideeControlleur.getIdees);
router.delete("/:id", ideeControlleur.deleteIdee);

export default router;


// test smart commit