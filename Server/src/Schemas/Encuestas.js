import mongoose from 'mongoose';

const encuestas = mongoose.Schema({
  nombre: String,
  open: Boolean,
  periodo: String,
});

export const EncuestasModel = mongoose.model('Encuestas', encuestas);
