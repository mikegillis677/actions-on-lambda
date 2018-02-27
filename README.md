# Actions on Google fulfillment on AWS Lambda

This library enables you to easily setup a AWS Lambda function that handles requests from Google Actions using
the `actions-on-google` NodeJS SDK.

When I first was trying to solve this problem, I was frusterated at the lack of tools available.
This library is a quick and easy integration to solve this problem for you.

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
