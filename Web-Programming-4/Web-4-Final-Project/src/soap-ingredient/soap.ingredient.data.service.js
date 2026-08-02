const pool = require('../db');
const SoapIngredient = require('./soap.ingredient.model');

exports.getAll = async () => {
    let conn;
    try{
        conn = await pool.getConnection();
        const sql = `
            SELECT si.soap_id, si.ingredient_id, si.amount_used,
                    s.soap_name, i.ingredient_name
            FROM soap_ingredient si
            JOIN soap s ON s.soap_id = si.soap_id
            JOIN ingredient i ON i.ingredient_id = si.ingredient_id
            ORDER BY si.soap_id, si.ingredient_id
            `;
        const [rows] = await conn.query(sql);
        return rows.map(r => new SoapIngredient(r));
    }finally{
        conn?.release();
    }
};

exports.getBySoap = async (soapId) => {
    if(!Number.isInteger(soapId) || soapId <= 0){
        throw new Error("Invalid soapId");
    }

    let conn;

    try{
        conn = await pool.getConnection();
        const sql = `
            SELECT soap_id, ingredient_id, amount_used
            FROM soap_ingredient
            WHERE soap_id = ?
            ORDER BY ingredient_id
            `;
        const [rows] = await conn.query(sql, [soapId]);
        return rows.map(r => new SoapIngredient(r));
    }finally{
        conn?.release();
    }
};

exports.getOne = async (soapId, ingredientId) => {
    if(!Number.isInteger(soapId) || !Number.isInteger(ingredientId)){
        throw new Error("Invalid ids");
    }

    let conn;

    try{
        conn = await pool.getConnection();
        const sql = `
            SELECT soap_id, ingredient_id, amount_used
            FROM soap_ingredient
            WHERE soap_id = ? AND ingredient_id = ?
            `;
        const [rows] = await conn.query(sql, [soapId, ingredientId]);
        return rows.length ? new SoapIngredient(rows[0]) : null;
    }finally{
        conn?.release();
    }
};

exports.insert = async (si) => {
    if(!si || si.constructor?.name !== 'SoapIngredient'){
        throw new Error("Invalid parameter - must be SoapIngredient");
    }

    const [ok, errs] = si.validate();

    if(!ok) throw new Error("Invalid SoapIngredient - " + JSON.stringify(errs));

    let conn;

    try{
        conn = await pool.getConnection();
        const sql = `
        INSERT INTO soap_ingredient (soap_id, ingredient_id, amount_used)
        VALUES (?, ?, ?)
        `;
        await conn.query(sql, [si.soap_id, si.ingredient_id, si.amount_used]);
        return true;
    }finally{
        conn?.release();
    }
};

exports.update = async (si) => {
    if(!si || si.constructor?.name !== 'SoapIngredient'){
        throw new Error("Invalid parameter - must be SoapIngredient");
    }
    const [ok, errs] = si.validate();

    if(!ok) throw new Error("Invalid SoapIngredient - " + JSON.stringify(errs));

    let conn;

    try{
        conn = await pool.getConnection();
        const sql = `
            UPDATE soap_ingredient
            SET amount_used = ?
            WHERE soap_id = ? AND ingredient_id = ?
            `;
        const [result] = await conn.query(sql, [si.amount_used, si.soap_id, si.ingredient_id]);

        if(result.affectedRows !== 1) throw new Error("SoapIngredient not found");
            return true;
    }finally{
        conn?.release();
    }
};

exports.remove = async (soapId, ingredientId) => {
    let conn;

    try{
        conn = await pool.getConnection();
        const sql = `DELETE FROM soap_ingredient WHERE soap_id = ? AND ingredient_id = ?`;
        const [result] = await conn.query(sql, [soapId, ingredientId]);
        return result.affectedRows === 1;
    }finally{
        conn?.release();
    }
};