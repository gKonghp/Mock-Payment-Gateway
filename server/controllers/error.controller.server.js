/**
 * Created by gordonkong on 25/8/2018.
 */
var config = require('../configs/config.server');

exports.render = function (req, res, next) {
    res.render('error.view.server', function (err, html) {
        if (!err)
            res.send(html);
        else
            next(err);
    });
}