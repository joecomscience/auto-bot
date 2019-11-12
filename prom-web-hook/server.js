const express = require('express');
const apiMetrics = require('prometheus-api-metrics');
const { sendSms } = require('./sms');
const { errHandler } = require('./middleware');
const {
    livediness,
    readiness
 } = require('./healtcheck');

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
app.get('/readiness', readiness);
app.get('/livediness', livediness);
app.post('/sms', sendSms);

const server = app.listen(port, onListen);

process.on('SIGTERM', gracefulShutdown);
