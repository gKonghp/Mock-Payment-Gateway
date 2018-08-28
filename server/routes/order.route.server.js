
module.exports = function(app) {
    var orderController = require("../controllers/order.controller.server");
    var paymentGatewayAdaptorController = require('../controllers/paymentGatewayAdaptor.controller.server');
    app.route('/api/order')
        .post(paymentGatewayAdaptorController.enterPaymentGetway)
        .post(orderController.insertOrder)
        .get(orderController.getOrder);

};
