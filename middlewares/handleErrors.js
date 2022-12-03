const handleErrors = (err, req, res, next) => {
  // if (err instanceof ApiError) {
  //   res.status(err.statusCode).json(err.message);
  //   return;
  // }
  //
  // res.status(500).json('Server not response');

  res.status(err.status || 500);
  res.send({ message: err.message || 'Server' });
  next();
};

export default handleErrors;
