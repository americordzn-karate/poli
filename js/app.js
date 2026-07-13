const parametros = new URLSearchParams(window.location.search);

const token = parametros.get("token");


const API = "https://script.google.com/macros/s/AKfycby_VEimaoCdKecJQ7WrhYtQuPzy4-FPuvjHXuh46kuhENkc_diQkBiNAYlaHuOmb9qQ/exec";


if (!token) {

    alert("No se recibió el token de acceso.");

}


fetch(API + "?token=" + token)

.then(respuesta => respuesta.json())

.then(datos => {


    console.log("Respuesta recibida:");

    console.log(datos);



    if (datos.ok) {


        document.getElementById("sucursal").innerHTML =
        datos.sucursal.nombre;


        document.getElementById("estado").innerHTML =
        "🟢 Conectado";


        mostrarAlumnos(datos.alumnos);



    } else {


        document.getElementById("estado").innerHTML =
        "❌ Error de acceso";


    }



})

.catch(error => {


    console.error("Error al conectar con la API:");

    console.error(error);


});





function mostrarAlumnos(alumnos) {


    const contenido =
    document.getElementById("contenido");


    contenido.innerHTML = "";


    let grupos = {};



    alumnos.forEach(alumno => {


        if (!grupos[alumno.grupo]) {

            grupos[alumno.grupo] = [];

        }


        grupos[alumno.grupo].push(alumno);


    });





    Object.keys(grupos).forEach(grupo => {


        const titulo =
        document.createElement("div");


        titulo.className = "grupo";


        titulo.innerHTML =
        "GRUPO " + grupo;


        contenido.appendChild(titulo);




        grupos[grupo].forEach(alumno => {


            const fila =
            document.createElement("div");


            fila.className = "alumno";


            fila.innerHTML = `

            <input 
            type="checkbox"
            value="${alumno.id}">

            ${alumno.nombre}

            `;


            contenido.appendChild(fila);


        });

document
.getElementById("btnRegistrar")
.addEventListener("click",function(){


    const seleccionados =
    document.querySelectorAll(
        'input[type="checkbox"]:checked'
    );


    let alumnos = [];


    seleccionados.forEach(check=>{


        alumnos.push(check.value);


    });



    if(alumnos.length === 0){


        alert("No seleccionaste alumnos.");


        return;


    }



    const datos = {


        token: token,


        alumnos: alumnos


    };



    if(navigator.onLine){


    enviarAsistencia(datos);


}else{


    guardarPendiente(datos);


    alert(
    "⚠️ Sin conexión.\n\n" +
    "La asistencia quedó guardada y se enviará cuando vuelva internet."
    );


}



});

    });



}

function mostrarResultado(resultado){


    let mensaje="";


    if(resultado.registrados.length > 0){


        mensaje +=
        "✅ Asistencias registradas:\n\n";


        mensaje +=
        resultado.registrados.join("\n");


    }



    if(resultado.omitidos.length > 0){


        mensaje +=
        "\n\n⚠️ No registrados:\n\n";


        mensaje +=
        resultado.omitidos.join("\n");


    }



    alert(mensaje);


}

function enviarAsistencia(datos){


    fetch(API, {


        method:"POST",


        headers:{


            "Content-Type":"text/plain;charset=utf-8"


        },


        body:JSON.stringify(datos)


    })


    .then(respuesta=>respuesta.json())


    .then(resultado=>{


        mostrarResultado(resultado);


    })


        .catch(error=>{


        console.log(error);


        guardarPendiente(datos);


        alert(
        "⚠️ No se pudo conectar.\n\n" +
        "La asistencia quedó guardada para sincronizar después."
        );


    });


}

window.addEventListener(
    "online",
    function(){


        console.log(
            "Internet recuperado"
        );


        sincronizarPendientes();


    }
);
