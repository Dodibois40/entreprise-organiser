const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titre: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String,
    default: ''
  },
  priorite: { 
    type: String, 
    enum: ['basse', 'moyenne', 'haute'], 
    default: 'moyenne' 
  },
  statut: { 
    type: String, 
    enum: ['à faire', 'en cours', 'terminée'], 
    default: 'à faire' 
  },
  dateDebut: { 
    type: Date, 
    default: Date.now 
  },
  dateFin: { 
    type: Date
  },
  assigneA: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  planningId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Planning' 
  },
  creePar: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  tags: [String],
  completionPourcentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances des requêtes
taskSchema.index({ statut: 1 });
taskSchema.index({ priorite: 1 });
taskSchema.index({ assigneA: 1 });
taskSchema.index({ creePar: 1 });

module.exports = mongoose.model('Task', taskSchema); 