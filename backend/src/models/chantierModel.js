const mongoose = require('mongoose');

// Schéma pour les données financières (estimation et réel)
const donneesFinancieresSchema = new mongoose.Schema({
  montantMarcheSigne: {
    type: Number,
    required: true,
    default: 0
  },
  budgetDepenses: {
    type: Number,
    required: true,
    default: 0
  },
  achatMatieresPremieres: {
    type: Number,
    required: true,
    default: 0
  },
  sousTraitance: {
    type: Number,
    required: true,
    default: 0
  },
  tempsFabrication: {
    type: Number, // en heures
    required: true,
    default: 0
  },
  tempsPause: {
    type: Number, // en heures
    required: true,
    default: 0
  }
});

// Schéma principal pour les chantiers
const chantierSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  client: {
    type: String,
    required: true,
    trim: true
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  statut: {
    type: String,
    enum: ['En préparation', 'En cours', 'En pause', 'Terminé', 'Annulé'],
    default: 'En préparation'
  },
  description: {
    type: String,
    trim: true
  },
  adresse: {
    type: String,
    trim: true
  },
  // Données financières
  estimation: donneesFinancieresSchema,
  reel: donneesFinancieresSchema,
  // Calcul automatique de la marge prévisionnelle et réelle
  margePrevisionnelle: {
    type: Number,
    default: 0
  },
  margeReelle: {
    type: Number,
    default: 0
  },
  // Références aux documents liés
  responsable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Indexation pour optimiser les recherches fréquentes
chantierSchema.index({ code: 1 }, { unique: true });
chantierSchema.index({ client: 1 });
chantierSchema.index({ statut: 1 });
chantierSchema.index({ dateDebut: 1 });

// Middleware pour calculer les marges avant la sauvegarde
chantierSchema.pre('save', function(next) {
  // Calcul de la marge prévisionnelle
  if (this.estimation && this.estimation.montantMarcheSigne) {
    const totalCoutsEstimes = this.estimation.budgetDepenses || 0;
    this.margePrevisionnelle = this.estimation.montantMarcheSigne - totalCoutsEstimes;
  }
  
  // Calcul de la marge réelle
  if (this.reel && this.reel.montantMarcheSigne) {
    const totalCoutsReels = this.reel.budgetDepenses || 0;
    this.margeReelle = this.reel.montantMarcheSigne - totalCoutsReels;
  }
  
  next();
});

const Chantier = mongoose.model('Chantier', chantierSchema);

module.exports = Chantier;
