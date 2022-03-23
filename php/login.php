<?php
require_once('conexion.php');
    // Creamos la conexión con MySQL
    $usuario = $_POST["user"];  // dentro de post va el nombre de dato enviado
    $contraseña = $_POST["pass"];

    //$correo = "algun correo";   usar para pruebas comentando las de arriba
    //$contraseña = "contraseña"

    $query= "SELECT * FROM usuario WHERE nombre = '$usuario' AND contraseña = '$contraseña'";  // cambiar correo y contraseña por nombre de columnas en bbdd
    $resultado = $conexion->query($query);

    if (mysqli_num_rows($resultado)>0) // Si coinciden los dos tendra un usuario 
    {
        echo json_encode(1);
    }

    else 
    {
        echo json_encode(0);
    }
?>