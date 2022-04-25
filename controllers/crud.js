const { DATETIME, NEWDATE } = require('mysql/lib/protocol/constants/types');
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
exports.venta = (req, res)=>{
    const id = req.body.id;
    const cantventa = req.body.cantidad;
    const cantidad = req.body.cantog - cantventa;
    const precio = req.body.precio;
    const valor = cantventa*precio;
    const categoria = req.body.categoria;
    const peso = req.body.peso;
    const volumen = req.body.volumen;
    const nombre = req.body.nombre;
    // ----Atributos de finanzas----
    const fecha = new Date();
    fecha.setHours(0,0,0,0);
    const gananciadiaria = req.body.gananciadiaria;
    const totalmensual = req.body.totalmensual;
    const dinerofardo = req.body.dinerofardo;
    var nganancia = parseInt(gananciadiaria) + valor;
    var ntotalmensual = parseInt(totalmensual) + valor;
    var ndinerofardo = parseInt(dinerofardo) - valor;
    conexion.query('UPDATE fardo SET ? WHERE id = ?', [{nombre:nombre, precio:precio, cantidad:cantidad, categoria:categoria, peso:peso, volumen:volumen},id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            conexion.query('INSERT INTO ventas SET ?', {valor:valor, fecha:fecha},(error, results)=>{
                if(error){
                    console.log(error);
                }else{
                    conexion.query('UPDATE finanzas SET ? WHERE fecha = ?', [{dinerofardo:ndinerofardo, totalmensual:ntotalmensual, gananciadiaria:nganancia}, fecha], (error, results)=>{
                        if(error){
                            console.log(error);
                        }else{
                            res.redirect('/stock');
                        }
                    })
                }
            })
        }
    })
}