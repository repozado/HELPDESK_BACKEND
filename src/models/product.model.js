const db = require('../config/db');

//Lista todos los productos
exports.findAll = async () => {
    const result = await db.query('SELECT * FROM product');
    return result.rows;
};

//devuelve un producto por su id
exports.findById = async (id) => {
    const result = await db.query('SELECT * FROM product WHERE id = $1', [id]);
    return result.rows[0];
};

//inserta un nuevo producto
exports.insert = async ({
    brand, description, model, name, type, color, performance, iva, irbp, ice, part_number, id_olympo
}) => {
    const result = await db.query(
        `INSERT INTO product (brand, description, model, name, type, color, performance, iva, irbp, ice, part_number, id_olympo) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        [brand, description, model, name, type, color, performance, iva, irbp, ice, part_number, id_olympo]
    );
    return result.rows[0];
};

//actualiza un producto por su id
exports.update = async (id, fields) => {
    // Construir la consulta de actualización dinámicamente
    const keys = Object.keys(fields);
    if (keys.length === 0) return await this.findById(id);

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = keys.map(k => fields[k]);
    values.push(id); // Agregar el id al final para la cláusula WHERE

    const result = await db.query(
        `UPDATE product SET ${setClause} WHERE id = $${values.length} RETURNING *`,
        values
    );
    return result.rows[0];
};

//elimina un producto por su id
exports.remove = async (id) => {
    const result = await db.query('DELETE FROM product WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};