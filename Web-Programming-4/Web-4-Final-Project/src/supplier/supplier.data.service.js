const pool = require("../db");
const Supplier = require("./supplier.model");

exports.getAll = async () => {
  let connection = null;

  try{
    connection = await pool.getConnection();
    const sql = `
      SELECT 
        supplier_id,
        supplier_Name,
        supplier_email,
        supplier_phone
      FROM suppliers
    `;
    
    const [rows] = await connection.query(sql);

    return rows.map(r => new Supplier({
        id: r.supplier_id,
        Name: r.supplier_Name,
        email: r.supplier_email,
        phone: r.supplier_phone
    }));
    }catch(error){
        throw error;
    }finally{
        connection?.release();
    }
};

exports.getById = async (id) => {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Invalid parameter sent to getById() - must be a positive integer");  
    }

    let connection = null;

    try{
        connection = await pool.getConnection();
        const sql = `
        SELECT 
            supplier_id,
            supplier_Name,
            supplier_email,
            supplier_phone
        FROM suppliers
        WHERE supplier_id = ?
        `;
    const [rows] = await connection.query(sql, [id]);

    if(rows.length === 0){
      return null;
    }else{
        return new Supplier({
        id: rows[0].supplier_id,
        Name: rows[0].supplier_Name,
        email: rows[0].supplier_email,
        phone: rows[0].supplier_phone
        });
    }   
    }catch(error){
        throw error;
    }finally{
        connection?.release();
    }
};

exports.insert = async (supplier) => {
     if(supplier === null){
        throw new Error("Invalid parameter sent to insertSupplier() - cannot be null");
    }

    if(supplier.constructor.name !== "Supplier"){
        throw new Error(/Invalid Supplier/);
    }

    const [isValid, errs] = supplier.validate();
    if(!isValid){
        throw new Error("Invalid Supplier - " + JSON.stringify(errs));
    }

    let connection = null;

    try{
        connection = await pool.getConnection();
        const sql = `
            INSERT INTO suppliers (supplier_Name, supplier_email, supplier_phone)
            VALUES (?, ?, ?)
        `;
    const [result] = await connection.query(sql, [supplier.Name, supplier.email, supplier.phone]);

    return result.insertId;
    }catch(error){
        throw error;
    }finally{
        connection?.release();
    }

};

exports.update = async (supplier) => {
    if(!supplier || supplier.constructor.name !== "Supplier"){
        throw new Error("Invalid parameter sent to update() - must be a Supplier model object");
    }

    const [isValid, errs] = supplier.validate();
    if(!isValid){
        throw new Error("Invalid Supplier - " + JSON.stringify(errs));
    }

    let connection = null;

    try{
        connection = await pool.getConnection();
        const sql = `
            UPDATE suppliers 
            SET supplier_Name = ?, supplier_email = ?, supplier_phone = ?
            WHERE supplier_id = ?
        `;
        const [result] = await connection.query(sql, [supplier.Name, supplier.email, supplier.phone, supplier.id]);

        if(result?.affectedRows !== 1){
            throw new Error("Supplier not found");
        }
            return true;
    }catch(error){
        throw error;
    }finally{
        connection?.release();
    }
};

exports.remove = async (id) => {

    let connection = null;

    try{
        connection = await pool.getConnection();
        const sql = "DELETE FROM suppliers WHERE supplier_id = ?";
        const [result] = await connection.query(sql, [id]);

    return result.affectedRows === 1;
    }catch(error){
        throw error;
    }finally{
        connection?.release();
    } ///added this for the assignment but maybe it is better with out the option. will leave in for now.
};