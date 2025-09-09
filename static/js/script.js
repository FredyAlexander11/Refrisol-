let nombre = document.getElementById("nombre");
let telefono = document.getElementById("cel");
let correo = document.getElementById("email");
let direccion = document.getElementById("direccion");
let formulario = document.getElementById("formulario");
let mensaje = document.getElementById("mensaje");
let fecha = document.getElementById("fecha");
let select = document.getElementById("select")
let select1 = document.getElementById("select1")

formulario.addEventListener("submit", function(event){
    let errores = [];
    if(nombre.value === "" || correo.value === "" || direccion.value === ""){
        errores.push("todos los campos son obligatorios.");
        alert("llenar todos los campos")
    }   
    const regexCelular = /^3\d{9}$/;
    if (!regexCelular.test(telefono.value)){
        errores.push("numero de celular invalido");
        alert("numero de telefono invalido")
    }
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo.value)){
        errores.push("correo invalido");
        alert ("Correo invalido");
    }
    const regexDireccion = /^[A-Za-zñóáéíú0-9\s.,#-°]{8,50}$/;
    if(!regexDireccion.test(direccion.value)){
        errores.push("1")
        alert("Dirección invalida")
    }
    const palabras = mensaje.value.trim().split(/\s+/);
    if(palabras.length > 10){
        errores.push("2");
        alert("El mensaje no puede tener más de 10 palabras.");
    }
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth()+1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    const fechaMinima = `${anio}-${mes}-${dia}`;
    const fechaSeleccionada = new Date(fecha.value);
    fecha.min = fechaMinima;
    if(fechaSeleccionada < hoy){
        errores.push("3");
        alert("No se puede seleccionar una fecha pasada.");
    }
    if(errores.length > 0){
        event.preventDefault();
    }
    else{
        alert("formulario enviado correctamente");
        fetch("/guardar",{   //Ajusta la URL según tu configuración
        method: "POST", //Método HTTP
        headers:{       //Encabezados
            "Content-Type": "application/json"  //Tipo de contenido
        },
        body: JSON.stringify({
            nombre: nombre.value, 
            telefono: telefono.value, 
            correo: correo.value, direccion: direccion.value,
            select: select.value,
            fecha: fecha.value,
            select1: select1.value, 
            mensaje: mensaje.value
        })   
    })
.then(response => response.json())       //Parsear la respuesta como JSON
.then(data=> {
    document.getElementById("mensaje").textContent = data.mensaje;  //Mostrar el mensaje de éxito
    document.getElementById("formulario").reset(); 
}) //Limpiar el formulario
    }
});
