// const mysql = require('mysql2/promise');
import mysql from 'mysql2/promise';
 
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'web4_sample_db',
  password:''
});
 
async function getUserById(id){
    const result = await pool.query('SELECT * from users WHERE user_id = ?', [id]);
    return result;
} 
 
// const resp = await getUserById(2);
// console.log(resp);
 
async function getUserById_NOTSAFE(id){
    const result = await pool.query('SELECT * from users WHERE user_id = ' + id);
    return result;
} 
 
const resp2 = await getUserById_NOTSAFE("1 OR 1 = 1");
console.log("NOT SAFE RESULT----\n", resp2);
 
const resp3 = await getUserById("1 OR 1 = 1");
console.log("SAFE RESULT-------\n". resp3);
 
/*
Note that in many cases the param that gets passed into
getUserById comes straight from the URL of the request:
 
  GET /users/7 --> getUserById(7)
 
So a hacker could try this request:
 
  GET /users/7%20OR%201=1   (Note that %20 is how put spaces in URL parameters)
*/