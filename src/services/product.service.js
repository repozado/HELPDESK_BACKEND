const model = require("../models/product.model");

exports.getAllProducts = async () => {
  return await model.findAll();
};

exports.getProductById = async (id) => {
  return await model.findById(id);
};

exports.createProduct = async (productData) => {
  return await model.insert(productData);
};

exports.updateProduct = async (id, fieldsToUpdate) => {
  return await model.update(id, fieldsToUpdate);
};

exports.deleteProduct = async (id) => {
  return await model.remove(id);
};
