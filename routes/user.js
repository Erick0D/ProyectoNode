const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

user.post("/signin", async (req,res,next) => {
    const { username, password } = req.body

    if(username && password){
        let query = "INSERT INTO users (username, password)"
        query += `VALUES ('${username}','${password}');`;
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Usuario registrado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

user.post("/login", async (req,res,next) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = '${username}' AND password ='${password}';`
    const rows = await db.query(query);

    if(username && password){
        if(rows.length == 1){
            const token = jwt.sign({
                id: rows[0].user_id,
                username: rows[0].username
            }, "debugkey");
            return res.status(200).json({code: 200, message: token});
        }
        else{
            return res.status(200).json({code: 401, message: "Usuario y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

user.get("/", async (req,res,next) => {
    const query = "SELECT * FROM users;";
    const rows = await db.query(query);

    return res.status(200).json({code: 200, message: rows})
});

module.exports = user;