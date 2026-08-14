require("dotenv").config();
const express = require("express");
const app = express();


app.get("/", (req, res) => {
    for(key in process.env){
        console.log(`Key: ${key} Value:${process.env[key]}`);
    }
    res.send(`NODE_ENV: ${process.env.NODE_ENV} DB_PASSWORD: ${process.env.DB_PASSWORD}`);
})


app.listen(8080);