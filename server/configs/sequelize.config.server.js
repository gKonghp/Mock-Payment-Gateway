/**
 * Created by gordonkong on 27/8/2018.
 */

var Sequelize = require('sequelize'),
    config = require('./config.server');

// configuration for database
var database = config.dbs.sqlite,
    dbStorages = database.storages,
    username = database.username,
    password = database.password,
    host = database.host;
// configuration the re-connection setting
var reconnectOptions = {
    max_retries: 999,
    onRetry: function (count) {
        console.log("connection lost, trying to reconnect (" + count + ")");
    }
};

// set the connection
var sequelizeOrderDB = new Sequelize('order', null, null, {
    storage: require('path').normalize(config.rootPath + '/' + dbStorages[0]),
    dialect: 'sqlite',
    reconnect: reconnectOptions || true
});

var sequelizePaymentADB = new Sequelize('paymentA', null, null, {
    storage: require('path').normalize(config.rootPath + '/' + dbStorages[1]),
    dialect: 'sqlite',
    reconnect: reconnectOptions || true
});

var sequelizePaymentBDB = new Sequelize('paymentB', null, null, {
    storage: require('path').normalize(config.rootPath + '/' + dbStorages[2]),
    dialect: 'sqlite',
    reconnect: reconnectOptions || true
});
// import the database model schema
var Order = sequelizeOrderDB.import(config.rootPath + "server/models/order.model.server");
var PaymentA = sequelizePaymentADB.import(config.rootPath + "server/models/paymentA.model.server");
var PaymentB = sequelizePaymentBDB.import(config.rootPath + "server/models/paymentB.model.server");

// connect db
sequelizeOrderDB.authenticate()
    .then(function () {
        console.log("Sqlite [order] opened...");
    })
    .catch(function (err) {
        console.log(err);
        console.log("Sqlite [order] cannot not be connected...");
    })
    .done();

sequelizePaymentADB.authenticate()
    .then(function () {
        console.log("Sqlite [paymentA] opened...");
    })
    .catch(function (err) {
        console.log(err);
        console.log("Sqlite [paymentA] cannot not be connected...");
    })
    .done();

sequelizePaymentBDB.authenticate()
    .then(function () {
        console.log("Sqlite [paymentB] opened...");
    })
    .catch(function (err) {
        console.log(err);
        console.log("Sqlite [paymentB] cannot not be connected...");
    })
    .done();
module.exports = {sequelizeOrderDB: sequelizeOrderDB, sequelizePaymentADB: sequelizePaymentADB, sequelizePaymentBDB: sequelizePaymentBDB};
