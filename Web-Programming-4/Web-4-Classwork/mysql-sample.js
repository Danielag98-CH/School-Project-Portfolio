
// We used ES Modules instead of CommonJS (which uses require())
// const mysql = require('mysql2/promise');
 
// Here's the ES6 Modules way of importing
import mysql from 'mysql2/promise';
// Note that you may have to add a 'type' property to your package.json file and set it to a value of 'module'
// For example: "type":"module",
 
// Set up a pool/connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'web4_sample_db',
  password:''
});
 
// Run some queries:
// const result = await pool.query('SELECT * from users');
// const result = await pool.query('SELECT * from users WHERE user_id = ? and user_email = ?', [1, "john@doe.com"]);
// console.log(result[0]);
 
// A function to get a user by their ID:
async function getUserById(id){
    const result = await pool.query('SELECT * from users WHERE user_id = ?', [id]);
    return result;
} 
 
const resp = await getUserById(2);
console.log(resp);