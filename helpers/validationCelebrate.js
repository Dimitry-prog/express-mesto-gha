import { celebrate, Joi } from 'celebrate';
import { regExpForEmail, regExpForLink } from '../utils/constants.js';

export const validationQuerySignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30)
      .default('Your name'),
    about: Joi.string().trim().min(2).max(30)
      .default('Your activity'),
    avatar: Joi.string().trim().pattern(regExpForLink).default('https://www.lifesavvy.com/p/uploads/2020/10/269d4e5a.jpg?height=200p&trim=2,2,2,2'),
    email: Joi.string().trim().required().pattern(regExpForEmail),
    password: Joi.string().trim().required(),
  }),
});
export const validationQuerySignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().trim().required().pattern(regExpForEmail),
    password: Joi.string().trim().required(),
  }),
});
