const express = require('express');
//Llamar a dependenci router, para definir rutas
const router = express.Router();

//Llamada a módulo base de datos
const conexion = require('./database/db');


//Ruta para llamar al login (home page)
router.get('/', (req, res)=>{
    res.render('login');
 })

//Ruta para llamar al index (selección de módulo)
// router.get('/index', (req, res)=>{
//     res.render('index');
// })

//Ruta Index con auth
router.get('/index', (req, res)=> {
	if (req.session.loggedin) {
		res.render('index',{
			login: true,
			name: req.session.name			
		});		
	} else {
		res.render('nologin',{
			login:false,
			name:'Debe iniciar sesión',			
		});				
	}
	res.end();
});


//Logout
//Destruye la sesión.
router.get('/logout', function (req, res) {
	req.session.destroy(() => {
	  res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
	})
});

//Ruta modulo stock con auth
router.get('/stock', (req, res)=>{
    conexion.query('SELECT * FROM fardo', (error, results)=>{
        if(error){
            throw error;
        }else{
            if (req.session.loggedin) {
                res.render('stock', {results:results});		
            } else {
                res.render('nologin',{
                    login:false,
                    name:'Debe iniciar sesión',			
                });				
            }
            res.end();
        }
    })
})

//Mostrar todos los registros (modulo stock)
// router.get('/stock', (req, res)=>{
//     conexion.query('SELECT * FROM fardo', (error, results)=>{
//         if(error){
//             throw error;
//         }else{
//             res.render('stock', {results:results});
//         }
//     })
// })

//Ruta crear los registros (modulo stock) con auth
router.get('/create', (req, res)=>{
    if (req.session.loggedin) {
		res.render('create',{
			login: true,
			name: req.session.name			
		});		
	} else {
		res.render('nologin',{
			login:false,
			name:'Debe iniciar sesión',			
		});				
	}
	res.end();
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
    });
});

//Ruta para eliminar registro (modulo stock)
router.get('/delete/:id', (req, res)=>{
    //Recibir el id
    const id = req.params.id;
    //Seleciona de fardo lo capturado en ID
    conexion.query('DELETE FROM fardo WHERE id=?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/stock');
        }
    })
})

//Ruta vender fardos (modulo stock)
router.get('/sale/:id', (req, res)=>{
    //Recibir el id, precio, cantidad
    const id = req.params.id;
    const fecha = new Date();
    fecha.setHours(0,0,0,0);
    //Seleciona de fardo lo capturado en ID
    conexion.query('SELECT * FROM fardo WHERE id=?', [id], (error, resfardo)=>{
        if(error){
            throw error;
        }else{
            conexion.query('SELECT * FROM finanzas WHERE fecha=?', [fecha], (error, results)=>{
                if(error){
                    throw error;
                }else{
                    res.render('sale', {fardo:resfardo[0],finanzas:results[0]})
                }
            })
        }
    })
})


//Ruta modulo finanzas con auth
router.get('/finance', (req, res)=>{
    const fecha = new Date();
    fecha.setHours(0,0,0,0);
    conexion.query('SELECT * FROM finanzas', (error, results)=>{
        if(error){
            throw error;
        }else{
            if (req.session.loggedin) {
                res.render('finance', {results:results});		
            } else {
                res.render('nologin',{
                    login:false,
                    name:'Debe iniciar sesión',			
                });				
            }
            res.end();
        }
    })
})

//Ruta historial finanzas con auth
router.get('/record', (req, res)=>{
    conexion.query('SELECT * FROM finanzas', (error, results)=>{
        if(error){
            throw error;
        }else{
            if (req.session.loggedin) {
                res.render('record', {results:results});		
            } else {
                res.render('nologin',{
                    login:false,
                    name:'Debe iniciar sesión',			
                });				
            }
            res.end();
        }
    })
})
//INTOCABLE//
//Llamar al CRUD
const crud = require('./controllers/crud');
router.post('/save', crud.save);
router.post('/update', crud.update);
router.post('/venta', crud.venta);

module.exports = router;