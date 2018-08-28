/**
 * Created by gordonkong on 25/8/2018.
 */
var config = require('../configs/config.server'),
    sequelize = require('../configs/sequelize.config.server'),
    Order = sequelize.sequelizeOrderDB.model('Order');
    redisClient = require('../configs/redis.config.server'),
    cardValidator = require('card-validator');

exports.insertOrder = function(req, res, next){
    var order = req.body;
        if(order.referenceCode == undefined || order.referenceCode == null){
            return res.status(400).send({
                payload: "cannot insert",
                status: false
            });
        }
        if(order.custName == undefined || order.custName == null){
            return res.status(400).send({
                payload: "cannot insert",
                status: false
            });
        }
        if(order.custPhone == undefined || order.custPhone == null){
            res.status(400).send({
                payload: "cannot insert",
                status: false
            });
        }
        if(order.currency == undefined || order.currency == null){
            res.status(400).send({
                payload: "cannot insert",
                status: false
            });
        }
        if(order.price == undefined || order.price == null){
            res.status(400).send({
                payload: "cannot insert",
                status: false
            });
        }

    order.createdAt = new Date();

    return Order.create(order)
        .then(function (result) {
            res.json({payload: result, status: true});
            return null;
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send({
                 payload: "cannot insert",
                 status: false
             });
        });

}

exports.getOrder = function(req, res, next){
    var queryStr = {};

    if(req.query.referenceCode == undefined || req.query.referenceCode == null ){
        return res.status(404).send({error: "not found"});
    }
    if(req.query.custName == undefined || req.query.custName == null ){
        return res.status(404).send({error: "not found"});
    }

    queryStr.referenceCode = req.query.referenceCode;
    queryStr.custName = req.query.custName;
    var key = (queryStr.referenceCode + queryStr.custName).replace(" ", "");

    return redisClient.get(key, function(error, value){

        if(error) {
            console.log(error);
        }
        // Not found

        if(value == undefined || value == null) {
            // Update Cache from db
            Order.findOne({where: queryStr})
                .then(function (payment) {
                    if (payment == null) {
                        return res.status(400).send({
                            payload: "cannot find the records",
                            status: false
                        });
                    } else {
                        // Update cache
                        redisClient.set(key, JSON.stringify(payment.dataValues), function (error, status){
                            if(status == "OK") {
                                //set expiry
                                redisClient.expireat(key, new Date()/1000 + config.dbs.redisdb.expiry);
                                // Get from Cache
                                redisClient.get(key, function (error, value) {
                                    return res.json({payload: JSON.parse(value), status: true});
                                });
                            }
                        });


                    }

                })
                .catch(function (err) {
                    return res.status(400).send({
                        payload: "cannot find the records",
                        status: false
                    });
                }).done();
        }else{
            // Get from Cache
            return res.json({payload: JSON.parse(value), status: true});
        }
    });


}

