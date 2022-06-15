const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String
});

const RegisterModel = mongoose.model('Register', RegisterSchema);

class Register {
  constructor(body) {
    this.body = body;
  }
}

module.exports = Register;
