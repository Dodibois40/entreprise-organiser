const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  assigneA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'L\'utilisateur assigné est requis']
  },
  dateDebut: {
    type: Date,
    required: [true, 'La date de début est requise']
  },
  dateFin: {
    type: Date,
    required: [true, 'La date de fin est requise']
  },
  statut: {
    type: String,
    enum: ['à faire', 'en cours', 'terminée', 'annulée'],
    default: 'à faire'
  },
  priorite: {
    type: String,
    enum: ['basse', 'moyenne', 'haute', 'urgente'],
    default: 'moyenne'
  },
  categorie: {
    type: String,
    enum: ['administration', 'technique', 'commercial', 'autre'],
    default: 'autre'
  },
  creeePar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  actif: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexation pour accélérer les requêtes par statut et utilisateur assigné
taskSchema.index({ statut: 1, assigneA: 1 });
taskSchema.index({ dateDebut: 1 });
taskSchema.index({ dateFin: 1 });

// Vérification si le modèle existe déjà pour éviter la recompilation
const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

module.exports = Task; 