const express = require('express');
const apiMetrics = require('prometheus-api-metrics');
const { sendSms } = require('./sms');
const { livediness } = require('./healtcheck');
const { errHandler } = require('./middleware');

const app = express();
const port = process.env.SMS_URI ? process.env.SMS_URI : 3000;
const onListen = () => console.log(`server start listening port: ${port}`);

global.ready = true;

const gracefulShutdown = () => {
    global.ready = false;
    const greacefulStop = () => process.exit(0);

    server.close((err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.info('Terminating services');
        setTimeout(greacefulStop, 5000);
    });
}

app.use(errHandler);
app.use(apiMetrics());
app.get('/readiness', healthCheckCtrl);
app.get('/livediness', livediness);
app.get('/sms', sendSms);

const server = app.listen(port, onListen);

process.on('SIGTERM', gracefulShutdown);
