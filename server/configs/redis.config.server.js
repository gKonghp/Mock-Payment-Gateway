/**
 * Created by gordonkong on 25/8/2018.
 */

var redis = require("redis");
var config = require('./config.server');
var client = redis.createClient();

client.on("error", function (err) {
    console.log("Errors in Redis " + err);
});
client.on('connect', function() {
    console.log('Redis DB is connected.');
});

module.exports = client;