# Mock Payment Gateway
This is a demostration to show using different gateways by different conditions.
# Flows
#### Make payment
- Get the inputs from the user
- Validate the inputs
- If the inputs are valid, the client side will try to send a request to server to decide which gateways should be used [Card type, Currency]. Then, return the payment reference code from Gateway to the server in order to record the order and show the successful messages with the customer's name and reference code.
- Go through Gateway A
![Alt text](https://image.ibb.co/i6EvYU/make_payment_success_gw_a.png "Gateway A Sucessful")
- Go through Gateway B
![Alt text](https://image.ibb.co/eXVr7p/make_payment_success.png "Gateway B Sucessful")
- If the inputs are not valid or fail to order, show error mesages.
![Alt text](https://image.ibb.co/cPUJnp/make_payment_error.png "Error")

##### Validations
- Customer Name: Only accept Chinese and English with spaces
- Customer Phone Number: Only accept 8-digital phone number in HK
- Currency: Only accept 'HKD', 'USD', 'AUD', 'EUR', 'CNY', 'JPY'
- Price: Only accept number with at most 2 decimal places.
- Credit Card Holder: Only accept Chinese and English with spaces
- Credit Card Number: Using card-validator to check the credit card type [VISA, MASTER, AMX, ...] and the card number validation with each card center.
Examples of credit cards: {AMX: 378282246310005, MasterCard: 5105105105105100, VISA: 4111111111111111, JCB: 3530111333300000}
- Credit Card Expiration: Only accept the 'MM/YY' format and an valid date.
- Credit Card CCV: 3 digits or 4 digits [It is different issued by card centers]

#### Check payment
- Get the inputs from the user
- The client side will try to send a request to server, which will fetch the Redis cache first. If no specified record found [or expired] on the cache, write the data to cache from reading the database. Then, get the record from the cache to show on the client side.
![Alt text](https://image.ibb.co/k3kf09/check_payment_success.png "Found")
- If not found
![Alt text](https://image.ibb.co/eq3YL9/check_payment_not_found.png "Not found")

#### Additional Gateway Handling
- As implemented a gateway adaptor as a middleware, only modified the gateway adaptor with the conditions to support more gateways.
```sh
    var gatewayA = require('../externalGateways/gatewayA.controller.server'),
        gatewayB = require('../externalGateways/gatewayB.controller.server');
```
```sh
if(card.type == 'american-express' || body.currency.match(/^(USD|AUD|EUR|JPY|CNY)$/i)){
    // Enter gatewayA
    gatewayA.makeTransaction(body, function(referenceCode){
        req.body.referenceCode = referenceCode;
        next();
    },
    function(err){
        next();
    });
}else{
    // Enter gatewayB
    gatewayB.makeTransaction(body, function(referenceCode){
        req.body.referenceCode = referenceCode;
        next();
    },function(err){
        next();
    });
}
```

# Data Structure
#### Order Table
| Field | Description |
| ------ | ------ |
| referenceCode | Payment Reference Code [Key, String, Not null] |
| custName | Custemer Name [String, Not null] |
| custPhone | Customer Phone Number [String, Not null] |
| currency | Currency [String(3), Not null] |
| price | Price [Number, Not null] |
| createdAt | Created Datetime [Date, Not null] |

#### PaymentA Table/ PaymentB Table [Accessd by Gateway A/ B]
| Field | Description |
| ------ | ------ |
| referenceCode | Payment Reference Code [Key, int, Not null, Auto increment] |
| createdAt | Created Datetime [Date, Not null] |
---
# Project Structure
| Directory | Description |
| ------ | ------ |
| /public/src | Client side [React.JS] source files |
| /server | Server side [Node.JS] source files |
| /Order.db | Sqlite file for 'Order' records |
| /paymentA.db | Sqlite file for 'PaymentA' records |
| /paymentB.db | Sqlite file for 'PaymentB' records |

| URL | Description |
| ------ | ------ |
|http://localhost:8080 | Home page |
|http://localhost:8080/check-payment | Check payment page |
|http://localhost:8080/make-payment | Make payment page|
|POST: http://localhost:8080/api/payment | API for making order record: {referenceCode, custName, custPhone, currency, price, cardHolderName, cardNum, cardExpiration, cardCCV} |
|GET: http://localhost:8080/api/order?referenceCode={0}&custName={1} | API for getting order record |
---
# Installation 
- Install Node.js locally (Used v10.3.0)
- Install Redis locally (Used v4.0.11)
---
# Usages
Start Redis server
Go to '/server'
Install the dependencies and start the server with the 8080 port (default)
```sh 
$ cd server
$ npm install
$ node server.js
```
Go to '/public/src' 
Install the dependencies and compile the source code of React.JS client side [May not be neccessary]
```sh 
$ cd public/src
$ npm install
$ npm run build
```

Go to "http://localhost:8080" and check it, thanks
