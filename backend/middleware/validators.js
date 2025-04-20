const { celebrate, Joi, Segments } = require("celebrate");

const validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
});

const validateSignin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validatePhotoUpload = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(500).optional().allow(""),
    imageUrl: Joi.string().uri().required(),
    owner: Joi.string().hex().length(24).optional(), // en caso de que lo envíes
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validatePhotoUpload,
};
