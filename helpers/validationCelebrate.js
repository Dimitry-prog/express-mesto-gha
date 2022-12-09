import { celebrate, Joi } from 'celebrate';
import { regExpForEmail, regExpForLink } from '../utils/constants.js';

export const validationSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30),
    about: Joi.string().trim().min(2).max(30),
    avatar: Joi.string().trim().pattern(regExpForLink),
    email: Joi.string().trim().required().pattern(regExpForEmail),
    password: Joi.string().trim().required(),
  }),
});

export const validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().trim().required().pattern(regExpForEmail),
    password: Joi.string().trim().required(),
  }),
});

export const validationProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30),
    about: Joi.string().trim().min(2).max(30),
    avatar: Joi.string().trim().pattern(regExpForLink),
  }),
});

export const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30),
    link: Joi.string().trim().pattern(regExpForLink),
  }),
});

export const validationCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

export const validationGetUser = celebrate({
  query: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});
