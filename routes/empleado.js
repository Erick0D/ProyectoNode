const express = require('express');

const empleado = express.Router();
const db = require('../config/database');
const notFound = require('../middleware/notFound');

empleado.post("/", async (req,res,next) => {
    const { nombre, apellidos, tel, email, direccion } = req.body;

    if(nombre && apellidos && tel && email && direccion){
        let query = "INSERT INTO empleados(nombre, apellidos, tel, email, direccion)";
        query += ` VALUES('${nombre}','${apellidos}',${tel},'${email}','${direccion}')`;
    
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Empleado agregado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

empleado.delete("/:id([0-9]{1,3})", async (req,res,next) => {
    const query = `DELETE FROM empleados WHERE id=${req.params.id}`;

    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado eliminado correctamente"});
    };
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

empleado.put("/:id([0-9]{1,3})", async (req,res,next) =>{
    const { nombre, apellidos, tel, email, direccion } = req.body;

    if(nombre && apellidos && tel && email && direccion){
        let query = `UPDATE empleados SET nombre='${nombre}',apellidos='${apellidos}',`;
        query += `tel=${tel},email='${email}',direccion='${direccion}' WHERE id=${req.params.id}`;

        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

empleado.get("/", async (req,res,next) => {
    const emp = await db.query("SELECT * FROM empleados");
    return res.status(200).json({code: 200, message: emp});
});

empleado.get('/:id([0-9]{1,3})', async (req,res,next) =>{
    const id = req.params.id;
    if(id >= 1) {
        const emp = await db.query("SELECT * FROM empleados WHERE id = "+id+";");
        return res.status(200).json({code: 200, message: emp});
    }
    return res.status(404).send({code: 404, message: "Empleado no encontrado."});
});

empleado.get('/:name([A-Za-z]+)', async (req,res,next) =>{
    const name = req.params.name;
    const emp = await db.query("SELECT * FROM empleados WHERE nombre LIKE '%"+name+"%';");
    if(emp.length > 0)  {
        return res.status(200).json({code: 200, message: emp});
    }
    return res.status(404).send({code: 404, message: "No existe ningun empleado con ese nombre."});
});

module.exports = empleado;