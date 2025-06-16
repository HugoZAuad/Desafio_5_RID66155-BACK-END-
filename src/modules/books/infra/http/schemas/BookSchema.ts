import Joi from 'joi';

export const createBookSchema = Joi.object({
  titulo: Joi.string().required(),
  pages: Joi.number().integer().required(),
  ISBN: Joi.number().integer().required(),
  editora: Joi.string().required(),
});

export const updateBookSchema = Joi.object({
  titulo: Joi.string(),
  pages: Joi.number().integer(),
  ISBN: Joi.number().integer(),
  editora: Joi.string(),
}).min(1);

export const idParamSchema = Joi.object({
  id: Joi.number().integer().required(),
});
