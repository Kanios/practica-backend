const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  edad: { type: Number, required: true },
  ciudad: { type: String, required: true },
  intereses: [String],
  permiteRecibirOfertas: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);
module.exports = User;