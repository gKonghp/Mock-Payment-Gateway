/**
 * Created by gordonkong on 28/8/2018.
 */
var config = require('../configs/config.server'),
    sequelize = require('../configs/sequelize.config.server'),
    cardValidator = require('card-validator'),
    PaymentA = sequelize.sequelizePaymentADB.model('PaymentA');

exports.makeTransaction = function (data, successCallback, failCallback) {
    var cardNumberValid = cardValidator.number(data.cardNum);
    var card = cardNumberValid.card;
    if(cardNumberValid == null || !cardNumberValid.isValid){
        return null;
    }
    var cardExpValid =cardValidator.expirationDate(data.cardExpiration, 90);
    if(cardExpValid == null || !cardExpValid.isValid) {
        return null;
    }

    if(data.cardCCV.length != card.code.size){
        return null;
    }

    var body = {createdAt: new Date()};
    return PaymentA.create(body)
        .then(function (result) {
            if(result) {
                successCallback('GWA-' + result.dataValues.referenceCode);
                return null;
            }else{
                failCallback(result);
                return null;
            }

        })
        .catch(function (err) {
            failCallback(err);
            return null;
        });
}