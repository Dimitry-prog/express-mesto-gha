import { celebrate, Joi } from 'celebrate';
import { regExpForLink } from '../utils/constants.js';

export const validationQuerySignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30)
      .default('Dimitry'),
    about: Joi.string().trim().min(2).max(30)
      .default('frontend'),
    avatar: Joi.string().trim().pattern(regExpForLink).default('https://www.lifesavvy.com/p/uploads/2020/10/269d4e5a.jpg?height=200p&trim=2,2,2,2'),
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required().min(8),
  }),
});

export const validationQuerySignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required().min(8),
  }),
});
