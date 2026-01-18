const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: "Datos inválidos", details: error.details });
  }
  next();
};

module.exports = { validateBody };
