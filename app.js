//Llamada a dependenciaprrincipal express
const express = require('express');
const app = express();
//Dependencias secundarias
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'})

//Seteo de encoded para capturar datos de formulario
app.use(express.urlencoded({extended:false}));
//Le decimos que usaremos JSON
app.use(express.json());

//Directorio publico
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//Establecer motor de plantilla ejs
app.set('view engine', 'ejs');

//Variable de sesión
const sesion = require('express-session');
app.use(sesion({
    secret:'secret',
    resave: true,
    saveUninitialized:true
}));

//Invocar al modulo de conexion
const connection = require('./database/db')


//Importar router
//app.use('/', require('./router'));
app.use(require('./router'));

//Login
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.rut;
	let password = request.body.pass;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM usuario WHERE rut = ? AND contrasena = ?', [username, password], function(error, results, fields){
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Redirect to home page
                request.session.loggedin = true;
				response.redirect('/index');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});



//Abrir servidor en puerto 3000
app.listen(3000, (req, res)=>{
    console.log('SERVER RUNNING IN http://localhost:3000');
})