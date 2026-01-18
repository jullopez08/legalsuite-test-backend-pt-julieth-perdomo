const Joi = require("joi");

const createLawyerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  specialization: Joi.string().optional(),
  status: Joi.string().valid("active", "inactive").required(),
});

module.exports = { createLawyerSchema };
