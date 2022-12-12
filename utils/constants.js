import rateLimit from 'express-rate-limit';

export const regExpForLink = /(^https?:\/\/[w{3}]?.?[a-zA-z0-9-]+[.\w{2,}]*)[\\/\w{1,}]*/;
export const regExpForEmail = /^([\w\-.]+)@([\w\-.]+)\.([\w\-.]{2,5})$/;
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

export const httpStatusCode = {
  created: 201,
  ok: 200,
};
