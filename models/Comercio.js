const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReseñaSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comentario: { type: String, required: true },
  calificacion: { type: Number, required: true, min: 1, max: 5 },
  fecha: { type: Date, default: Date.now }
});

const ComercioSchema = new Schema({
  nombre: { type: String, required: true },
  cif: { type: String, required: true },
  direccion: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  ciudad: { type: String, default: '' },
  actividad: { type: String, default: '' },
  titulo: { type: String, default: '' },
  resumen: { type: String, default: '' },
  textos: { type: String, default: '' },
  fotos: { type: [String], default: [] },
  idPagina: { type: Number, required: true },
  scoring: { type: Number, default: 0 },
  numeroPuntuaciones: { type: Number, default: 0 },
  reseñas: { type: [ReseñaSchema], default: [] },
  borrado: { type: Boolean, default: false }
});

module.exports = mongoose.model('Comercio', ComercioSchema);