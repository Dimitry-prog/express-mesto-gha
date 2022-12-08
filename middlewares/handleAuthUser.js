import jwt from 'jsonwebtoken';
import RequiredAuth from '../errors/RequiredAuth.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthUser = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new RequiredAuth('Authorization required');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (e) {
    throw new RequiredAuth('Authorization required');
  }

  req.user = payload;

  next();
};

export default handleAuthUser;
