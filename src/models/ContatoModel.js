const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phone: { type: Number, required: false },
    criadoEm: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('contato', ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }
    async register() {
        this.valid();
        if(this.errors.length > 0) return;
        this.contato = await ContatoModel.create(this.body);
    }
    valid() {
        this.cleanUp();
        if(this.body.name.length > 15) this.errors.push('Coloque um nome menor');
        if(this.body.sobrenome > 15) this.errors.push('Coloque um sobrenome menor');
        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');
        if(!this.body.email && !this.body.phone) this.errors.push('Por favor coloque um meio de contato!');
        if(this.body.phone.length > 15) this.errors.push('Coloque um número válido!');
    }
    cleanUp() {
        this.body = {
            name: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            phone: this.body.numero
        }
    }
    async edit(id) {
        if(typeof id !== 'string') return;
        this.valid();
        if(this.errors.length > 0) return;
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
    }
    static async idFinder(id) {
        const user = await ContatoModel.findById(id);
        return user;
    }
    static async contatosFinder() {
        const contatos = await ContatoModel.find({});
        return contatos;
    }
    static async delete(id) {
        if(typeof id !== 'string') return;
        const contato = await ContatoModel.findOneAndDelete({ _id: id });
        return contato;
    }
}
module.exports = Contato;