const express = require('express')
const router = express.Router()
const qrcode = require('qrcode-terminal')
const { phoneNumberFormatter } = require('../helpers/formatter');
const { Client,LocalAuth } = require('whatsapp-web.js');

const SESSION_FILE_PATH = './session.json';
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath:SESSION_FILE_PATH
    }),
    puppeteer: { headless: true }
});

client.initialize();

//config Whatsapp API
client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small:true})
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});


client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

router.route('/send')
    .post((req, res) => {
        const number = phoneNumberFormatter(req.body.number); //this input post CI
        const message = req.body.message;

       // res.send(number)
        client.sendMessage(number, message).then(response => {
            res.status(200).json({
                status: true,
                response: response
            });
        }).catch(err => {
            res.status(500).json({
                status: false,
                response: err
            });
        });

    })

    client.on('change_state', state => {
        console.log('CHANGE STATE', state );
    });
    
    client.on('disconnected', (reason) => {
        console.log('Client was logged out', reason);
    });

module.exports = router