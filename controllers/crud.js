const conexion = require('../database/db');

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
            res.redirect('/');
        }
    })
}