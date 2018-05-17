const awsIot = require('aws-iot-device-sdk');
const dotenv = require('dotenv');

dotenv.load({path:'.env.development'});

var device = awsIot.device({
    keyPath: process.env.AWS_IOT_PRIVATE_KEY_PATH,
    certPath: process.env.AWS_IOT_CERTIFICATE_PATH,
    caPath: process.env.AWS_IOT_ROOT_CA_CERTIFICATE_PATH,
    clientId: process.env.AWS_IOT_UNIQUE_CLIENT_IDENTIFIER,
    host: process.env.AWS_IOT_CUSTOM_ENDPOINT
});

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
    .on('connect', function() {
        console.log('connect');
        device.subscribe('topic_1');
        device.publish('topic_2', JSON.stringify({ test_data: 1}));
    });

device
    .on('message', function(topic, payload) {
        console.log('message', topic, payload.toString());
    });