/**
 * Created by gordonkong on 25/8/2018.
 */
module.exports = function(app) {
    var entry = require("../controllers/entry.controller.server.js");
    app.route('/').get(entry.render);
};
