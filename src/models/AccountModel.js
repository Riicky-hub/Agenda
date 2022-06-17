const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const AccountSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const AccountModel = mongoose.model('user', AccountSchema);

class Account {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
  async register() {
    this.valid();
    if(this.errors.length > 0) return;
    await this.userExits();
    if(this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    try {
      this.user = await AccountModel.create(this.body);
    } catch(e) {
      console.log(e);
    }
  }
  valid() {
    this.cleanUp();

    if(!validator.isEmail(this.body.email)) {
      this.errors.push('E-mail inválido!');
    }
    if(this.body.password.length <= 3 || this.body.password.length >= 30) {
      this.errors.push('A senha precisa ter entre 3 e 30 caracteres');
    }
    if(this.body.confirm !== this.body.password) {
      this.errors.push('As senhas precisam ser as mesmas');
    }
  }
  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
    this.body = {
      email: this.body.email_cadastro,
      password: this.body.password_cadastro,
      confirm: this.body.confirm_cadastro
    }
  }
  async userExits() {
    const user = await AccountModel.findOne({ email: this.body.email });
    if(user) this.errors.push('Usuário já existe!');
  }
}

module.exports = Account;
