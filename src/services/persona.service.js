const model = require("../models/persona.model");

exports.getAllPersona = async () => {
  return await model.findAll();
};

exports.getPersonaById = async (id) => {
  return await model.findById(id);
};

exports.createPersona = async (personaData) => {
  return await model.insert(personaData);
};

exports.updatePersona = async (id, fieldsToUpdate) => {
  return await model.update(id, fieldsToUpdate);
};

exports.deletePersona = async (id) => {
  return await model.remove(id);
};
