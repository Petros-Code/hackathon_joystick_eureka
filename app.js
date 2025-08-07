import express from "express";
import pool from "./config/db.js";
import categorieRoutes from "./routes/categories.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const port = 3000;

import ideeRoutes from "./routes/idee.routes.js";
// import errorHandler from "./middlewares/errorHandler.js";

app.use(express.json());
app.use("/idees", ideeRoutes);

app.use(errorHandler);

//#region CHECK ETAT DU SERVEUR

app.get("/bienvenue", (req, res) => {
  res.json({ message: "Bienvenue sur le serveur EUREKA de la ville de Pau" });
});
app.get("/etat", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "OK", message: "Connecté à la DB" });
  } catch (error) {
    console.error("Erreur de connexion avc la DB :", error.message);
    res
      .status(500)
      .json({ status: "ERREUR", message: "Erreur de connexio navec la DB" });
  }
});

//#endregion

app.use(express.json());
app.use("/categories", categorieRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Le serveur tourne sur : http://localhost:${port}`);
});
