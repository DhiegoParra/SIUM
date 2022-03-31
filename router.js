const express = require('express');
//Llamar a dependenci router, para definir rutas
const router = express.Router();

//Llamada a módulo base de datos
const conexion = require('./database/db');

//Ruta para llamar al login
router.get('/', (req, res)=>{
    res.render('login');
 })

//Ruta para llamar al index (selección de módulo)
router.get('/index', (req, res)=>{
    res.render('index');
})

//Mostrar todos los registros (modulo stock)
router.get('/stock', (req, res)=>{
    conexion.query('SELECT * FROM fardo', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('stock', {results:results});
        }
    })
})

//Ruta crear los registros (modulo stock)
router.get('/create', (req, res)=>{
    res.render('create');
})

//Ruta editar los registros (modulo stock)
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

//Ruta para eliminar registro (modulo stock)
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

//Mostrar todas las finanzas
router.get('/finance', (req, res)=>{
    res.render('finance')
    // conexion.query('SELECT * FROM finanzas', (error, results)=>{
    //     if(error){
    //         throw error;
    //     }else{
    //         res.render('finance', {results:results});
    //     }
    // })
})



//INTOCABLE//
//Llamar al CRUD
const crud = require('./controllers/crud');
router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;