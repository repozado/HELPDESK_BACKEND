const service = require("../services/persona.service");

exports.getAll = async (req, res) => {
  try {
    const data = await service.getAllPersona();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const persona = await service.getPersonaById(id);
    if (!persona) return res.status(404).json({ message: "Persona not found" });
    res.json(persona);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newPersona = await service.createPersona(req.body);
    res.status(201).json(newPersona);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await service.updatePersona(id, req.body);
    if (!updated) return res.status(404).json({ message: "Persona not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await service.deletePersona(id);
    if (!deleted) return res.status(404).json({ message: "Persona not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
