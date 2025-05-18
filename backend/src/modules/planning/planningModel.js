const mongoose = require('mongoose');

const planningSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date
  },
  statut: {
    type: String,
    enum: ['En cours', 'Terminé', 'En attente'],
    default: 'En attente'
  },
  responsable: {
    type: String
  },
  lieu: {
    type: String
  },
  notes: {
    type: String
  },
  priorite: {
    type: String,
    enum: ['Basse', 'Normale', 'Haute'],
    default: 'Normale'
  },
  participants: {
    type: Array,
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Planning', planningSchema);
