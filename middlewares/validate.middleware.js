const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const err = new Error("Erreur de validation");
      err.status = 400;
      err.details = error.details.map((d) => d.message);
      return next(err);
    }

    req.body = value;
    next();
  };
};

export default validate;
