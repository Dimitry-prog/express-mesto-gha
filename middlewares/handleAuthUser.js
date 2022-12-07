import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthUser = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return ApiError.requiredAuth('Authorization required');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (e) {
    return ApiError.requiredAuth('Authorization required');
  }

  req.user = payload;

  next();
};

export default handleAuthUser;
