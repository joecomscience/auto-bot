const express = require('express');

const { sendSms } = require('./sms');

const app = express();
const port = process.env.SMS_URI ? process.env.SMS_URI : 3000
const server = () => console.log(`server start listening port: ${port}`);

const healthCheckCtrl = (req, res) => res.sendStatus(200);
const gracefulShutdown = (service) => {
    const greacefulStop = () => process.exit()

    service.close((err) => {
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
app.listen(port, server);

// process.on('SIGTERM', gracefulShutdown(app));
// process.on('SIGINT', gracefulShutdown(app))