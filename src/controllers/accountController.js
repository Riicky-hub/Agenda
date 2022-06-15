const RegisterModel = require('../models/RegisterModel');
exports.index = (req, res) => {
    res.render('account');
}
exports.register = (req, res) => {
    res.send(req.body);
}