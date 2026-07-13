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


    if(datos.ok){

        document.getElementById("sucursal").innerHTML =
        datos.sucursal.nombre;


        document.getElementById("estado").innerHTML =
        "🟢 Conectado";


        mostrarAlumnos(datos.alumnos);


    }else{

        document.getElementById("estado").innerHTML =
        "❌ Error de acceso";

    }


});



function mostrarAlumnos(alumnos){


    const contenido =
    document.getElementById("contenido");


    contenido.innerHTML = "";


    let grupos = {};


    // Agrupar alumnos por Grupo_ID

    alumnos.forEach(alumno=>{


        if(!grupos[alumno.grupo]){

            grupos[alumno.grupo]=[];

        }


        grupos[alumno.grupo].push(alumno);


    });



    // Crear visualización


    Object.keys(grupos).forEach(grupo=>{


        let titulo =
        document.createElement("div");

        titulo.className="grupo";

        titulo.innerHTML =
        "GRUPO " + grupo;


        contenido.appendChild(titulo);



        grupos[grupo].forEach(alumno=>{


            let fila =
            document.createElement("div");


            fila.className="alumno";


            fila.innerHTML = `

            <input 
            type="checkbox"
            value="${alumno.id}">

            ${alumno.nombre}

            `;


            contenido.appendChild(fila);


        });


    });


}

.catch(error => {

    console.error("Error al conectar con la API:");

    console.error(error);

});
