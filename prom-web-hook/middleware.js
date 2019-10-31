
const errHandler = (err, req, res, next) => {
  res.statusCode = 500
  res.json({ error: err.message })
  next()
};

module.exports = {
  errHandler,
};
