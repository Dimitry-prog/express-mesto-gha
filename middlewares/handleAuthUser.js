import jwt from 'jsonwebtoken';
import RequiredAuthError from '../errors/RequiredAuthError.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthUser = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie || !cookie.startsWith('jwt=')) {
    next(new RequiredAuthError('Authorization required'));
    return;
  }

  const token = cookie.replace('jwt=', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (e) {
    next(new RequiredAuthError('Authorization required'));
    return;
  }

  req.user = payload;

  next();
};

export default handleAuthUser;
