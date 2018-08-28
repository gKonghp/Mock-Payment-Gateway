/**
 * Created by gordonkong on 25/8/2018.
 */
module.exports = function(app) {
    var paymentGatewayAdapterController = require("../controllers/paymentGatewayAdaptor.controller.server.js");
    app.route('/api/payment-gateway')
        .post(paymentGatewayAdapterController.enterPaymentGetway);
};
