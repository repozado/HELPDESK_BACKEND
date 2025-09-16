const db = require('../config/db');

//Lista todas las personas
exports.findAll = async () => {
    const result = await db.query('SELECT * FROM persona');
    return result.rows;
};

//devuelve una persona por su id
exports.findById = async (id) => {
    const result = await db.query('SELECT * FROM persona WHERE id_persona = $1', [id]);
    return result.rows[0];
};

//inserta una nueva persona
exports.insert = async ({
    adjetivo, apellidos, cedula, ciudad, correo, direccion, 
    nombres, profesion, puesto, telefono, unit_id
}) => {
    const result = await db.query(
        `INSERT INTO persona (adjetivo, apellidos, cedula, ciudad, correo, direccion, nombres, profesion, puesto, telefono, unit_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        [adjetivo, apellidos, cedula, ciudad, correo, direccion, nombres, profesion, puesto, telefono, unit_id]
    );
    return result.rows[0];
};

//actualiza una persona por su id
exports.update = async (id, fields) => {
    // Construir la consulta de actualización dinámicamente
    const keys = Object.keys(fields);
    if (keys.length === 0) return await this.findById(id);

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = keys.map(k => fields[k]);
    values.push(id); // Agregar el id al final para la cláusula WHERE

    const result = await db.query(
        `UPDATE persona SET ${setClause} WHERE id_persona = $${values.length} RETURNING *`,
        values
    );
    return result.rows[0];
};

//elimina un persona por su id
exports.remove = async (id) => {
    const result = await db.query('DELETE FROM persona WHERE id_persona = $1 RETURNING *', [id]);
    return result.rows[0];
};