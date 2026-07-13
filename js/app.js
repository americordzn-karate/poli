const parametros = new URLSearchParams(window.location.search);

const token = parametros.get("token");


if (!token) {

    alert("No se recibió el token de acceso.");

}


// URL de tu Apps Script
const API = "https://script.google.com/macros/s/AKfycby_VEimaoCdKecJQ7WrhYtQuPzy4-FPuvjHXuh46kuhENkc_diQkBiNAYlaHuOmb9qQ/exec";


fetch(API + "?token=" + token)

.then(respuesta => respuesta.json())

.then(datos => {

    console.log("Respuesta recibida:");

    console.log(datos);

})

.catch(error => {

    console.error("Error al conectar con la API:");

    console.error(error);

});
