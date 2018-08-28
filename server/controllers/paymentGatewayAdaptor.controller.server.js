/**
 * Created by gordonkong on 25/8/2018.
 */
var config = require('../configs/config.server'),
    cardValidator = require('card-validator'),
    gatewayA = require('../externalGateways/gatewayA.controller.server'),
    gatewayB = require('../externalGateways/gatewayB.controller.server');


exports.enterPaymentGetway = function (req, res, next) {
    var body = req.body;

    if(body.custName == undefined || body.custName == null || !body.custName.match(/^([\u4e00-\u9fa5a-zA-Z\s]+)$/i)) {
        return res.status(422).send({payload: "Invalid parameters", status: false});
    }
    if(body.custPhone == undefined || body.custPhone == null  || !body.custPhone.match(/^([23456789][\d]{7})$/i)) {
        return res.status(422).send({payload: "Invalid parameters", status: false});
    }

   // if(body.cardNum == undefined || body.cardNum == null || !body.cardNum.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/i)) {
    if(body.cardNum == undefined || body.cardNum == null){
        return res.status(422).send({payload: "Invalid parameters", status: false});
    }
    if(body.currency == undefined || body.currency == null  || !body.currency.match(/^(HKD|USD|AUD|EUR|JPY|CNY)$/i)) {
        return res.status(422).send({payload: "Invalid parameters", status: false});
    }
    if(body.price == undefined || body.price == null  || !body.price.match(/^([\d]{1,}(\.[\d]{1,2})?)$/i)) {
        return res.status(422).send({payload: "Invalid parameters", status: false});
    }
    if(body.cardHolderName == undefined || body.cardHolderName == null || !body.cardHolderName.match(/^([\u4e00-\u9fa5a-zA-Z\s]+)$/i)) {
        return res.status(422).send({payload: "Invalid parameters", status: false});
    }
    if(body.cardExpiration == undefined || body.cardExpiration == null || !body.cardExpiration.match((/^(0?[1-9]|1[012]\/[\d]{2})$/i)))
    {
        return res.status(422).send({payload: "Invalid parameters", status: false});
    }
    if(body.cardCCV == undefined || body.cardCCV == null || !body.cardCCV.match(/^([\d]{3,4})$/i) )
    {
        return res.status(422).send({payload: "Invalid parameters", status: false});
    }

    // Checking
    var cardNumberValid = cardValidator.number(body.cardNum);
    var card = cardNumberValid.card;
    if(cardNumberValid == null || !cardNumberValid.isValid){
        return res.status(422).send({payload: "Invalid Card Number", status: false});
    }
    var cardExpValid =cardValidator.expirationDate(body.cardExpiration, 90);
    if(cardExpValid == null || !cardExpValid.isValid){
        return res.status(422).send({payload: "Invalid Card Expiration", status: false});
    }

    if(body.cardCCV.length != card.code.size){
        return res.status(422).send({payload: "Invalid Card CCV", status: false});
    }


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

}

