
const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

const binaryMimeTypes = [
    'font/eot',
    'font/opentype',
    'font/otf',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
];

module.exports = function (event, context, appCallback, configCallback = null) {
    if (typeof configCallback === 'function') {
        configCallback(app);
    }

    app.get('/', appCallback);
    app.post('/', appCallback);

    const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
    awsServerlessExpress.proxy(server, event, context);
};
