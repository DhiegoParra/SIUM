function getData() {
            
    const usuario = document.getElementById('user').value;
    const password = document.getElementById('pass').value;

    $.ajax({
        type: "POST",
        url: "iniciosesion.php",
        data: {
            user: usuario,
            pass: password
        },
        cache: false,
        
        success: function(respuestaEmpaquetada) {
            respuesta=JSON.parse(respuestaEmpaquetada);
            if (respuesta != '') {
                alert(respuesta);
            }
        }
    });
};