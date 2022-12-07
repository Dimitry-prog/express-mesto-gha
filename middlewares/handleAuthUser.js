import jwt from 'jsonwebtoken';

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthUser = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error({ message: 'Need authorization' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (e) {
    throw new Error({ message: 'Need authorization' });
  }

  req.user = payload;

  next();
};

export default handleAuthUser;
