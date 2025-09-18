const service = require("../services/usuario.service");

exports.getAll = async (req, res) => {
  try {
    const data = await service.getAllUsuario();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const usuario = await service.getUsuarioById(id);
    if (!usuario) return res.status(404).json({ message: "Usuario not found" });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newUsuario = await service.createUsuario(req.body);
    res.status(201).json(newUsuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await service.updateUsuario(id, req.body);
    if (!updated) return res.status(404).json({ message: "Usuario not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await service.deleteUsuario(id);
    if (!deleted) return res.status(404).json({ message: "Usuario not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};