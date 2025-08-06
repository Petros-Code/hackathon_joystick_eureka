const errorHandler = (err, req, res, next) => {
  console.error("Erreur :", err.message);
  res.status(500).json({ error: err.message || "Erreur interne du serveur" });
};

export default errorHandler;