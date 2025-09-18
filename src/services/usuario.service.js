const model = require("../models/usuario.model");

exports.getAllUsuario = async () => {
  return await model.findAll();
};

exports.getUsuarioById = async (id) => {
  return await model.findById(id);
};

exports.createUsuario = async (usuarioData) => {
  return await model.insert(usuarioData);
};

exports.updateUsuario = async (id, fieldsToUpdate) => {
  return await model.update(id, fieldsToUpdate);
};

exports.deleteUsuario = async (id) => {
  return await model.remove(id);
};