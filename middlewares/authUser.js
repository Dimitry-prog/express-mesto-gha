import jwt from 'jsonwebtoken';

const handleAuthUser = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error({ message: 'Need authorization' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret');
  } catch (e) {
    throw new Error({ message: 'Need authorization' });
  }

  req.user = payload;

  next();
};

export default handleAuthUser;
