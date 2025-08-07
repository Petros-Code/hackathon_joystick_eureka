import express from "express";
import pool from "../config/db.js";
import CommentaireRepository from "../module.commentaires/commentaire.repository.js";
import CommentaireController from "../module.commentaires/commentaire.controller.js";

const router = express.Router();

const commentaireRepository = new CommentaireRepository(pool);
const commentaireController = new CommentaireController(commentaireRepository);

// post commentaire
router.post("/", commentaireController.createCommentaire);
// get All commentaires
router.get("/", commentaireController.getAllCommentaires);
// post commentaire ById
router.get("/:id", commentaireController.getCommentaireById);
// delete commentaire
router.delete("/:id", commentaireController.deleteCommentaire);

export default router;
