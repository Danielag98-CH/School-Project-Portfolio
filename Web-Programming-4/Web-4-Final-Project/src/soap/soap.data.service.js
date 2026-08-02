const pool = require("../db");
const Soap = require("./soap.model");

exports.getAll = async () => {
  
    let connection = null;
    
    try{
        connection = await pool.getConnection();
        const sql = `
            SELECT soap_id, soap_name, description, created_by
            FROM soap
            ORDER BY soap_id
            `;
        const [rows] = await connection.query(sql);
        return rows.map(r => new Soap(r));
    }finally{
        connection?.release();
    }
};

exports.getById = async (id) => {
    if(!Number.isInteger(id) || id <= 0){
        
        throw new Error('Invalid parameter sent to getById() - must be a positive integer');
    }

    let connection = null;

    try{
        connection = await pool.getConnection();
        const sql = `
            SELECT soap_id, soap_name, description, created_by
            FROM soap
            WHERE soap_id = ?
            `;
        const [rows] = await connection.query(sql, [id]);
        return rows.length ? new Soap(rows[0]) : null;
    }finally{
        connection?.release();
    }
};

exports.insert = async (soap) => {
    if(!soap) throw new Error('Invalid parameter sent to insert() - cannot be null');
    if(soap.constructor?.name !== 'Soap') throw new Error(/Invalid Soap/);

    const [isValid, errs] = soap.validate();
    if(!isValid) throw new Error('Invalid Soap - ' + JSON.stringify(errs));

    let connection = null;
    try{
        connection = await pool.getConnection();
        const sql = `
                INSERT INTO soap (soap_name, description, created_by)
                VALUES (?, ?, ?)
                `;
        const params = [soap.soap_name, soap.description, soap.created_by];
        const [result] = await connection.query(sql, params);
        return result.insertId; // auto-increment ID
    }finally{
        connection?.release();
    }
};

exports.update = async (soap) => {
    if(!soap || soap.constructor?.name !== 'Soap'){
        throw new Error('Invalid parameter sent to update() - must be a Soap model object');
    }

    const [isValid, errs] = soap.validate();
    if(!isValid) throw new Error('Invalid Soap - ' + JSON.stringify(errs));

    let connection = null;
    try{
        connection = await pool.getConnection();
        const sql = `
                UPDATE soap
                SET soap_name = ?, description = ?, created_by = ?
                WHERE soap_id = ?
                `;
        const params = [soap.soap_name, soap.description, soap.created_by, soap.soap_id];
        const [result] = await connection.query(sql, params);
        if(result?.affectedRows !== 1) throw new Error('Soap not found');
        return true;
    }finally{
        connection?.release();
    }
};

exports.remove = async (id) => {
    let connection = null;
    try{
        connection = await pool.getConnection();
        const sql = `DELETE FROM soap WHERE soap_id = ?`;
        const [result] = await connection.query(sql, [id]);
        return result.affectedRows === 1;
    }finally{
        connection?.release();
    }
};