const db = require('../config/db');

// Lista todos los usuarios
exports.findAll = async () => {
    const result = await db.query('SELECT * FROM usuario');
    return result.rows;
};

// Devuelve un usuario por su id
exports.findById = async (id) => {
    const result = await db.query('SELECT * FROM usuario WHERE id_usuario = $1', [id]);
    return result.rows[0];
};

// Inserta un nuevo usuario
exports.insert = async ({
    apellidos, cedula, celular, direccion, email, estado,
    fecha_nacimiento, nombres, clave, telefono, nombre, id_uni_adm
}) => {
    const result = await db.query(
        `INSERT INTO usuario (
            apellidos, cedula, celular, direccion, email, estado,
            fecha_nacimiento, nombres, clave, telefono, nombre, id_uni_adm
        ) VALUES (
            $1, $2, $3, $4, $5, $6,
            $7, $8, $9, $10, $11, $12
        ) RETURNING *`,
        [
            apellidos, cedula, celular, direccion, email, estado,
            fecha_nacimiento, nombres, clave, telefono, nombre, id_uni_adm
        ]
    );
    return result.rows[0];
};

// Actualiza un usuario por su id
exports.update = async (id, fields) => {
    const keys = Object.keys(fields);
    if (keys.length === 0) return await this.findById(id);

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = keys.map(k => fields[k]);
    values.push(id);

    const result = await db.query(
        `UPDATE usuario SET ${setClause} WHERE id_usuario = $${values.length} RETURNING *`,
        values
    );
    return result.rows[0];
};

// Elimina un usuario por su id
exports.remove = async (id) => {
    const result = await db.query('DELETE FROM usuario WHERE id_usuario = $1 RETURNING *', [id]);
    return result.rows[0];
};