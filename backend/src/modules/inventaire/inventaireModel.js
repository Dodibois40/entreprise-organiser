const mongoose = require('mongoose');

const inventaireSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  categorie: {
    type: String,
    required: true,
    enum: ['ALUMINIUM', 'VERRE', 'QUINCAILLERIE', 'ACCESSOIRE', 'OUTILLAGE']
  },
  unite: {
    type: String,
    required: true,
    enum: ['UNITE', 'ML', 'M2', 'KG']
  },
  quantiteStock: {
    type: Number,
    required: true,
    default: 0
  },
  seuilAlerte: {
    type: Number,
    default: 5
  },
  prixUnitaire: {
    type: Number,
    required: true
  },
  fournisseurPrincipal: {
    type: String,
    trim: true
  },
  emplacement: {
    type: String,
    trim: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  dateDerniereMAJ: {
    type: Date,
    default: Date.now
  },
  commentaire: {
    type: String,
    trim: true
  }
}, { timestamps: true });

// Index pour les recherches courantes
inventaireSchema.index({ reference: 1 });
inventaireSchema.index({ designation: 'text' });
inventaireSchema.index({ categorie: 1 });
inventaireSchema.index({ quantiteStock: 1 });

const Inventaire = mongoose.model('Inventaire', inventaireSchema);

module.exports = Inventaire;
