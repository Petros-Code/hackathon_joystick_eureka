const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Erreur interne du serveur";

  console.error("Erreur :", message);

  if (status === 400) {
    return res.status(400).json({
      error: "Requête invalide",
      details: message,
    });
  }

  if (status === 404) {
    return res.status(404).json({
      error: "Ressource non trouvée",
      details: message,
    });
  }

  res.status(status).json({
    error: "Erreur interne du serveur",
    details: message,
  });
};

export default errorHandler;
