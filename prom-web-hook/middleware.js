const errHandler = (err, req, res, next) => {
  res.statusCode = 500;
  res.json({ error: err.message });
  next();
};

const showSMSBody = (req, res, next) => {
  logger.info(`sms body: ${JSON.stringify(req.body)}`);
  next(req, res);
};

module.exports = {
  errHandler,
  showSMSBody,
};
