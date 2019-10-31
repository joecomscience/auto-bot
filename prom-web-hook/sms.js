const request = require('request');
const { parseString } = require('xml2js')

// const URL = process.env.SMS_URI;
const URL = 'http://cf1ts808.aycap.bayad.co.th:8099/MasMessageTranc/services/Masmessage?wsdl';
const getData = (info) => {
    return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.ge.com" xmlns:bean="http://bean.ge.com">
        <soapenv:Header/>
        <soapenv:Body>
        <ser:saveSMS>
            <ser:bean>
                <bean:accountNo></bean:accountNo>
                <bean:appowner>DIGITAL_TECH</bean:appowner>
                <bean:busMsgCode>IT</bean:busMsgCode>
                <bean:cardNo></bean:cardNo>
                <bean:channel>INFO</bean:channel>
                <bean:lang>THA</bean:lang>
                <bean:msg>${info.msg}</bean:msg>
                <bean:profile>KRUNGSRIGRP_EN</bean:profile>
                <bean:refMsgCode></bean:refMsgCode>
                <bean:scheduling></bean:scheduling>
                <bean:subApp>OPENSHIFT</bean:subApp>
                <bean:telNo>${info.telNo}</bean:telNo>
            </ser:bean>
        </ser:saveSMS>
        </soapenv:Body>
    </soapenv:Envelope>`
}

const sendMsgToSmsGateway = () => {
    return new Promise((resolve, reject) => {
        const body = getData({ msg: 'Send message from Openshift', telNo: '0883111111' });
        const options = {
            url: URL,
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'text/xml;charset=utf-8',
                'Content-Length': body.length,
                'SOAPAction': 'saveSMS'
            }
        };

        request(options, (err, res, body) => {
            if (err) {
                console.error(err);
                return reject(err);
            };
            const parseXMLToString = (err, result) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                };
                return resolve(result)
            };
            parseString(body, parseXMLToString)
        });
    });
}

const sendSms = async (req, res) => {
    console.log('sms')
    const result = await sendMsgToSmsGateway()
    console.log(JSON.stringify(result))
    return res.sendStatus(200)
};

module.exports = {
    sendSms,
};