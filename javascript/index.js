window.addEventListener('DOMContentLoaded', () => {
    
})

const taskForm = document.getElementById('task-form')

//Enviando un evento e, pide no refrescar la pag de inmediato y muestra un mensaje por consola
// Los log son para ver en la consola lo que mando
taskForm.addEventListener('submit', (e) =>
{
    e.preventDefault()
    console.log('enviado') //Cuando se oprime ingresar se ve este mensaje
    const usuario = taskForm['user'];
    const contraseña = taskForm['pass'];
    console.log(user, pass); //Que se escribió en la casilla usuario
    console.log(user.value, pass.value);//Que se escribió en la casilla pass
})