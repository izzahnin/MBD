const Joi = require('joi');

const schema = {
  create: Joi.object({
    name: Joi.string().max(50).required(),
  })
}

module.exports = schema;