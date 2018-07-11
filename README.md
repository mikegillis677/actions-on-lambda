# Actions on Google fulfillment on AWS Lambda

This library enables you to easily setup a AWS Lambda function that handles requests from Google Actions using
the `actions-on-google` version 1 NodeJS SDK.

If you want to use AWS Lambda for Google Actions using `actions-on-google` version 2 (which is the current version
supported by Dialogflow), `actions-on-google` supports that out of the box.

## Installation

Initial setup:

```bash
$ npm add actions-on-lambda
```

## Example

```javascript
const { DialogflowApp } = require('actions-on-google');
const actionsOnLambda = require('actions-on-lambda');

function mainIntent (app) {
    app.ask("Welcome to the Example App");
};

function responseHandler (app) {
    switch (app.getIntent()) {
        case "input.welcome":
            mainIntent(app);
            break;

        default:
            mainIntent(app);
            break;
    }
}

exports.handler = function (event, context) {
    actionsOnLambda(event, context, (request, response) => {
        let dialogflowApp = new DialogflowApp({ request, response });
        dialogflowApp.handleRequest(responseHandler);
    });
};

```
