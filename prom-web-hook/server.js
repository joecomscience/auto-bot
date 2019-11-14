const express = require("express");
const apiMetrics = require("prometheus-api-metrics");
const { sendSms } = require("./sms");
const { errHandler, showSMSBody } = require("./middleware");
const { livediness, readiness } = require("./healtcheck");
const logger = require("./logging");

const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;
const onListen = () => logger.info(`server start listening port: ${port}`);

global.ready = true;
global.logger = logger;

const gracefulShutdown = () => {
  global.ready = false;
  const greacefulStop = () => process.exit(0);

  server.close(err => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info("Terminating services");
    setTimeout(greacefulStop, 5000);
  });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errHandler);
app.use(apiMetrics());
app.get("/readiness", readiness);
app.get("/livediness", livediness);
app.post("/sms", showSMSBody, sendSms);

const server = app.listen(port, onListen);

process.on("SIGTERM", gracefulShutdown);
