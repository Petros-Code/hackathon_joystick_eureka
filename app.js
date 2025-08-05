import cors from "cors";
import morgan from "morgan";
import express from "express";
import pool from "./config/db.js";

const app = express();
const port = 3000;

//#region CHECK ETAT DU SERVEUR
app.get("/bienvenue", (req, res) => {
    res.json({ message: "Bienvenue sur le serveur EUREKA de la ville de Pau"})
});
app.get("/etat", async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.status(200).json({ status : "OK", message : "Connecté à la DB" });
    } catch (error) {
        console.error("Erreur de connexion avc la DB :", error.message);
        res.status(500).json ({ status : "ERREUR", message: "Erreur de connexio navec la DB" });
    }
});
//#endregion
//#region MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//#endregion






app.listen(port, () => {
  console.log(`Server launched on http://localhost:${port}`);
});