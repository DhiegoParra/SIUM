const conexion = require('../database/db');

//Controlador para crear un nuevo fardo (modulo stock)
exports.save = (req, res)=>{
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const cantidad = req.body.cantidad;
    const categoria = req.body.categoria;
    const peso = req.body.peso;
    const volumen = req.body.volumen;
    conexion.query('INSERT INTO fardo SET ?', {nombre:nombre, precio:precio, cantidad:cantidad, categoria:categoria, peso:peso, volumen:volumen},(error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/stock');
        }
    })
}

//Controlador para editar un fardo (modulo stock)
exports.update = (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const cantidad = req.body.cantidad;
    const categoria = req.body.categoria;
    const peso = req.body.peso;
    const volumen = req.body.volumen;
    conexion.query('UPDATE fardo SET ? WHERE id = ?', [{nombre:nombre, precio:precio, cantidad:cantidad, categoria:categoria, peso:peso, volumen:volumen}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/stock');
        }
    })
}

//Controlador venta de un fardo (modulo stock)
exports.update = (req, res)=>{
    const id = req.body.id;
    const cantidad = req.body.cantidad;
    conexion.query('UPDATE fardo SET ? WHERE id = ?', [{cantidad:cantidad},id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/stock');
        }
    })
}