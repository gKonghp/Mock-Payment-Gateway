/**
 * Created by gordonkong on 25/8/2018.
 */
module.exports = function(app) {
    var entry = require("../controllers/error.controller.server.js");
    app.get("/error", entry.render);
};
