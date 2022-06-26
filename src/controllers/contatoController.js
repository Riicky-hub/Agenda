const ContatoModel = require('../models/ContatoModel');
exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    });
}
exports.register = async (req, res) => {
    try {
        const contato = new ContatoModel(req.body);
        await contato.register();
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => {
                res.redirect('back');
                return
            })
            return
        }
        req.flash('success', 'Seu contato foi criado com sucesso!');
        req.session.save(() => {
            res.redirect(`/contato/index/${contato.contato._id}`);
        });
        return;
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}
exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404');
    const user = await ContatoModel.idFinder(req.params.id);
    return res.render('contato', { contato: user })
}
exports.contatoEdited = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');
        const contato = new ContatoModel(req.body);
        await contato.edit(req.params.id);
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => {
                res.redirect('back');
                return
            })
            return
        }
        req.flash('success', 'Seu contato foi editado com sucesso!');
        req.session.save(() => {
            res.redirect(`/contato/index/${contato.contato._id}`);
        });
        return;
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
}
exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const contato = await ContatoModel.delete(req.params.id);

    req.flash('success', 'Seu contato foi deletado com sucesso!');
    req.session.save(() => res.redirect('back'));
    return;
}