const express = require('express');
//Llamar a dependenci router, para definir rutas
const router = express.Router();

//Llamada a módulo base de datos
const conexion = require('./database/db');

//Mostrar todos los registros
router.get('/', (req, res)=>{
    conexion.query('SELECT * FROM fardo', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('stock', {results:results});
        }
    })
})

//Ruta crear los registros
router.get('/create', (req, res)=>{
    res.render('create');
})

//Ruta editar los registros
router.get('/edit/:id', (req, res)=>{
    //Recibir el id
    const id = req.params.id;
    //Seleciona de fardo lo capturado en ID
    conexion.query('SELECT * FROM fardo WHERE id=?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('edit', {fardo:results[0]});
        }
    })
})

//Ruta para eliminar registro
router.get('/delete/:id', (req, res)=>{
    //Recibir el id
    const id = req.params.id;
    //Seleciona de fardo lo capturado en ID
    conexion.query('DELETE FROM fardo WHERE id=?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/');
        }
    })
})


//Llamar al CRUD
const crud = require('./controllers/crud');
router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;