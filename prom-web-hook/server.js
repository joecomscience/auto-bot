const express = require('express');

const { sendSms } = require('./sms');

const app = express();
const port = process.env.SMS_URI ? process.env.SMS_URI : 3000;
const onListen = () => console.log(`server start listening port: ${port}`);

const healthCheckCtrl = (req, res) => res.sendStatus(200);
const gracefulShutdown = () => {
    const greacefulStop = () => process.exit();

    server.close((err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.info('Terminating services');
        setTimeout(greacefulStop, 3000);
    });
}

app.get('/health', healthCheckCtrl);
app.get('/sms', sendSms);
const server = app.listen(port, onListen);

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown)