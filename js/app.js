const parametros = new URLSearchParams(window.location.search);

const token = parametros.get("token");


if (!token) {

    alert("No se recibió el token de acceso.");

}


// URL de tu Apps Script
const API = "AQUI_PONEMOS_LA_URL_DE_APPS_SCRIPT";


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
