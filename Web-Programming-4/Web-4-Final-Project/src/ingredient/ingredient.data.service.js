const pool = require("../db");
const Ingredient = require("./ingredient.model"); 

exports.getAll = async () => {
    let connection = null;

    try{
        connection = await pool.getConnection();
        const sql = `
                    SELECT
                        ingredient_id,
                        ingredient_name,
                        supplier_id,
                        cost,
                        amount_purchased
                    FROM ingredient
                    ORDER BY ingredient_id
                    `;
        
        const [rows] = await connection.query(sql);

        return rows.map(r => new Ingredient({
            ingredient_id: r.ingredient_id,
            ingredient_name: r.ingredient_name,
            supplier_id: r.supplier_id,
            cost: r.cost,
            amount_purchased: r.amount_purchased
        }));

    }catch(error){
        throw error;
    }finally{
        connection?.release();
    }
};

exports.getById = async (id) => {
    if(!Number.isInteger(id) || id < 0){
      
        throw new Error("Invalid parameter sent to getById() - must be an integer >= 0");
    
    }

    let connection = null;

    try{
        connection = await pool.getConnection();
        const sql = `
                    SELECT
                        ingredient_id,
                        ingredient_name,
                        supplier_id,
                        cost,
                        amount_purchased
                    FROM ingredient
                    WHERE ingredient_id = ?
                    `;
        const [rows] = await connection.query(sql, [id]);

    if(rows.length === 0) return null;

        const r = rows[0];

        return new Ingredient({
            ingredient_id: r.ingredient_id,
            ingredient_name: r.ingredient_name,
            supplier_id: r.supplier_id,
            cost: r.cost,
            amount_purchased: r.amount_purchased
        });

    }catch(error){
        throw error;
    }finally{
        connection?.release();
    }
};

exports.insert = async (ingredient) => {
    if(!ingredient){

        throw new Error("Invalid parameter sent to insert() - cannot be null");
    
    }
    
    if(ingredient.constructor?.name !== "Ingredient"){
    
        throw new Error("Invalid Ingredient - must be an Ingredient model object");
    
    }

    const [isValid, errs] = ingredient.validate();

    if(!isValid){
      
        throw new Error("Invalid Ingredient - " + JSON.stringify(errs));
    
    }

    let connection = null;

    try{
        connection = await pool.getConnection();

        const sql = `
                    INSERT INTO ingredient
                        (ingredient_id, ingredient_name, supplier_id, cost, amount_purchased)
                    VALUES (?, ?, ?, ?, ?)
                    `;
        const params = [
            ingredient.ingredient_id,
            ingredient.ingredient_name,
            ingredient.supplier_id,
            ingredient.cost,
            ingredient.amount_purchased
        ];

        await connection.query(sql, params);
        return ingredient.ingredient_id; 
    }catch(error){
        throw error;
    }finally{
        connection?.release();
    }
};

exports.update = async (ingredient) => {
    if(!ingredient || ingredient.constructor?.name !== "Ingredient"){
      
        throw new Error("Invalid parameter sent to update() - must be an Ingredient model object");
    
    }

    const [isValid, errs] = ingredient.validate();
    
    if(!isValid){
       
        throw new Error("Invalid Ingredient - " + JSON.stringify(errs));
    
    }

    let connection = null;

    try {
        connection = await pool.getConnection();
        const sql = `
                    UPDATE ingredient
                    SET
                        ingredient_name = ?,
                        supplier_id = ?,
                        cost = ?,
                        amount_purchased = ?
                    WHERE ingredient_id = ?
                    `;
    const params = [
        ingredient.ingredient_name,
        ingredient.supplier_id,
        ingredient.cost,
        ingredient.amount_purchased,
        ingredient.ingredient_id
    ];

    const [result] = await connection.query(sql, params);

    if(result?.affectedRows !== 1){
        
        throw new Error("Ingredient not found");
    
    }
        return true;

    }catch(error){
        throw error;
    }finally{
        connection?.release();
    }
};

exports.remove = async (id) => {
    if(!Number.isInteger(id) || id < 0){
        throw new Error("Invalid parameter sent to remove() - must be an integer >= 0");
    }

    let connection = null;

    try{
        connection = await pool.getConnection();
        const sql = "DELETE FROM ingredient WHERE ingredient_id = ?";
        const [result] = await connection.query(sql, [id]);
        return result.affectedRows === 1;
    }catch(error){
        throw error;
    }finally{
        connection?.release();
    }
};