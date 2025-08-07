import express from "express";
import VoteControlleur from "../module.votes/vote.controlleur.js";
import VoteRepository from "../module.votes/vote.repository.js";
import pool from "../config/db.js";

const router = express.Router();
const voteRepository = new VoteRepository(pool);
const voteControlleur = new VoteControlleur(voteRepository);
router.post("/", voteControlleur.createVote);



export default router;