const handleErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ message: err.message || 'Server not response' });
};

export default handleErrors;
