const express = require('express');
//Llamar a dependenci router, para definir rutas
const router = express.Router();

//Llamada a módulo base de datos
const conexion = require('./database/db');

//Mostratodos los registros
router.get('/', (req, res)=>{
    conexion.query('SELECT * FROM fardo', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('stock', {results:results});
        }
    })
})

//Crear todos los registros
router.get('/create', (req, res)=>{
    res.render('create');
})

//Llamar al CRUD
const crud = require('./controllers/crud');
router.post('/save', crud.save);

module.exports = router;