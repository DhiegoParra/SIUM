<?php
//Variables de coneccion
$Servername = "database-tesis.cbwaduvoroxb.us-east-1.rds.amazonaws.com";
$Username = "admin";
$Password = "pass1234";
$NameBD = "sium";

//Se establece la conexion
$conection = new mysqli($Servername, $Username, $Password, $NameBD);

//Mensaje en caso de fallo
if($conection->connect_error)
{
    die("No se pudo conectar con : " .$conection->connect_error);
}
?>