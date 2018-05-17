const awsIot = require('aws-iot-device-sdk');
const dotenv = require('dotenv');

dotenv.load({path:'.env.development'});


var device = awsIot.device({
    keyPath: <YourPrivateKeyPath>,
    certPath: <YourCertificatePath>,
    caPath: <YourRootCACertificatePath>,
    clientId: <YourUniqueClientIdentifier>,
    host: <YourCustomEndpoint>
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