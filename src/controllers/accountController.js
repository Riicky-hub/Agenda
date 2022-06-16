const AccountModel = require('../models/AccountModel');
exports.index = (req, res) => {
    res.render('account');
}
exports.register = async (req, res) => {
    try {
        const account = new AccountModel(req.body);
        await account.register();
        if(account.errors.length > 0) {
            req.flash('errors', account.errors);
            req.session.save(() => {
                return res.redirect('back');
            });
            return
        }
    
        req.flash('success', 'Sua conta foi criada com sucesso!');
        req.session.save(() => {
            return res.redirect('back');
        })
    } catch(e) {
        console.log(e);
    }
}