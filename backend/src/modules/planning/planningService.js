const Planning = require('./planningModel');

// Récupérer tous les plannings
const getPlannings = async () => {
  return await Planning.find().populate('responsable', 'nom email');
};

// Récupérer un planning par ID
const getPlanningById = async (id) => {
  return await Planning.findById(id).populate('responsable', 'nom email');
};

// Créer un nouveau planning
const createPlanning = async (data) => {
  const planning = new Planning(data);
  return await planning.save();
};

// Mettre à jour un planning
const updatePlanning = async (id, data) => {
  return await Planning.findByIdAndUpdate(id, data, { new: true }).populate('responsable', 'nom email');
};

// Supprimer un planning
const deletePlanning = async (id) => {
  return await Planning.findByIdAndDelete(id);
};

module.exports = {
  getPlannings,
  getPlanningById,
  createPlanning,
  updatePlanning,
  deletePlanning,
};
