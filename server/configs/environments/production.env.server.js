/**
 * Created by gordonkong on 25/8/2018.
 */
// configuration for production
module.exports = {
    dbs: {

        sqlite:{
            storages: ["order.db", "paymentA.db", "paymentB.db"],
            username: "",
            password: "",
        }
        ,
        redisdb:{
            host: "127.0.0.1",
            dbName: "orderCacheDB",
            expirySec: 60 * 60 * 24  // 24 hours
        }
    },
    sessionSecret: "nas38wqd1sa1230d1ph2",
    rootPath: require('path').normalize(__dirname + "/../../../"),
    port: process.env.PORT || 8080
}
