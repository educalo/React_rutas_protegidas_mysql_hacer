const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

//conexion con la bd
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'', 
    database: 'login'
});

//req es un objeto que contiene información sobre la solicitud HTTP que generó el evento. En respuesta a req, utiliza respara enviar la respuesta HTTP deseada.
app.get('/', (re, res) => {
    return res.json("Lado servidor");
})

//devuelve todos los usuarios
app.get('/alllogin', (req, res) => {
    const sql ="select * from login";
    db.query(sql, (err, data) => {
        if(err) return req.json(err);
        return res.json(data);
    })
})

//username id
app.get('/login/:id', (req, res) => {
    db.query('SELECT * FROM login WHERE id = ?', [req.params.id], (error, fila)=>{
        if(error){
            throw error
        }else{
            res.send(fila)
        }
    })
})

//Comprobar login, es exite devuelve 1 sino devuelve 0
app.post('/login', (req,res)=>{
    //let data = { username: req.params.a, password: req.params.b }
    let data = { username: req.params.a}

    let sql = "SELECT COUNT(*) FROM login WHERE username= ?"
    db.query(sql, data, function(err, result){
            if(err){
               throw err
            }else{              
             res.send(data) //enviamos los valores                         
        }
    })
})

app.listen(3000, () =>{
    console.log("escuchando puerto 3000");
})