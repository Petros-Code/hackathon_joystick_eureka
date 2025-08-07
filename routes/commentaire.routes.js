import express from "express";
import pool from "../config/db.js";
import CommentaireRepository from "../module.commentaires/commentaire.repository.js";
import CommentaireController from "../module.commentaires/commentaire.controller.js";

const router = express.Router();

const commentaireRepository = new CommentaireRepository(pool);
const commentaireController = new CommentaireController(commentaireRepository);

// POST : créer un commentaire
router.post("/", commentaireController.createCommentaire);

export default router;
