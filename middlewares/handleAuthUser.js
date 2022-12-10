import jwt from 'jsonwebtoken';
import RequiredAuthError from '../errors/RequiredAuthError.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthUser = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new RequiredAuthError('Authorization required'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
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
