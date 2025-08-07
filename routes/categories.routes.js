import express from "express";
import CategorieController from "../module.categories/categorie.controller.js";
import CategorieRepository from "../module.categories/categorie.repository.js";
import pool from "../config/db.js";

const router = express.Router();
const categorieRepository = new CategorieRepository(pool);
const categorieController = new CategorieController(categorieRepository);

router.post("/", categorieController.createCategorie);
router.get("/categories", categorieController.getAllCategories);
router.get("/:id", categorieController.getCategorieById);

router.delete("/:id", (req, res, next) =>
  categorieController.deleteCategorie(req, res, next)
);

export default router;
