import express from "express";
import CategorieController from "../module.categories/categorie.controller.js";
import CategorieRepository from "../module.categories/categorie.repository.js";
import pool from "../config/db.js"; // ton instance de pool (MySQL2 ou mariadb)

const router = express.Router();
const categorieRepository = new CategorieRepository(pool);
const categorieController = new CategorieController(categorieRepository);

router.post("/", categorieController.createCategorie);
router.get("/categories", categorieController.getAllCategories); // get all categories

export default router;
