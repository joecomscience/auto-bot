const { createLogger, format, transports } = require("winston");

const { combine, timestamp, simple, json } = format;
const loggingFormat = () =>
  process.env.NODE_ENV !== "prod" ? simple() : json();

const logger = createLogger({
  level: process.env.NODE_ENV !== "prod" ? "debug" : "info",
  format: combine(timestamp(), loggingFormat()),
  defaultMeta: { service: "prometheus-webhook" },
  transports: [new transports.Console()]
});

module.exports = logger;
