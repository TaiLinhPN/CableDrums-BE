import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string()
    .trim()
    .pattern(/^[^0-9]+$/)
    .pattern(/^\S.*\S$/)
    .replace(/[\s]+/g, " ")
    .strict()
    .min(3)
    .regex(/^.*\S*.*$/)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-zA-Z])/)
    .pattern(/^(?=.*\d)/)
    .pattern(/^(?=.*[!@#$%^&*])/)
    .trim()
    .strict()
    .min(6)
    .required(),
  email: Joi.string().email().required(),
  userType: Joi.string()
    .valid("admin", "planner", "supplyVendor", "projectContractor")
    .required(),
});

export const loginSchema = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[a-zA-Z])/)
    .pattern(/^(?=.*\d)/)
    .pattern(/^(?=.*[!@#$%^&*])/)
    .trim()
    .strict()
    .min(6)
    .required(),
  email: Joi.string().email().required(),
});

export const getBackOtpSchema = Joi.object({
  email: Joi.string().email().required(),
});
