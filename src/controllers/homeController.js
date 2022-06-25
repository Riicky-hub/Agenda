const ContatoModel = require('../models/ContatoModel');

exports.index = async (req, res) => {
  const contatos = await ContatoModel.contatosFinder();
  res.render('index', { contatos });
};