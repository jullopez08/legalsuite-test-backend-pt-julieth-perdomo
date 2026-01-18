const Joi = require("joi");

const createCaseSchema = Joi.object({
  case_number: Joi.string().required(),
  plaintiff: Joi.string().required(),
  defendant: Joi.string().required(),
  case_type: Joi.string().valid("civil", "criminal", "labor", "commercial").required(),
  status: Joi.string().valid("pending", "assigned", "in_progress", "resolved").required(),
  description: Joi.string().optional(),
  lawyer_id: Joi.string().uuid().optional(),
});

module.exports = { createCaseSchema };
