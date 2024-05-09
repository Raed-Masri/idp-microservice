import Joi from "joi";

const signUpScheme = Joi.object({
  dob: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  email: Joi.string().email().required(),
});

const signInScheme = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const updateUserScheme = Joi.object({
  dob: Joi.string().optional(),
  lastName: Joi.string().optional(),
  password: Joi.string().optional(),
  firstName: Joi.string().optional(),
  email: Joi.string().email().required(),
});

const getUserScheme = Joi.object({
  email: Joi.string().email().required(),
});

export { getUserScheme, signInScheme, signUpScheme, updateUserScheme };
