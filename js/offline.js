function guardarPendiente(datos){

    let pendientes =
    JSON.parse(
        localStorage.getItem("asistenciasPendientes")
    ) || [];


    pendientes.push(datos);


    localStorage.setItem(
        "asistenciasPendientes",
        JSON.stringify(pendientes)
    );

}



function obtenerPendientes(){

    return JSON.parse(
        localStorage.getItem("asistenciasPendientes")
    ) || [];

}



function limpiarPendientes(){

    localStorage.removeItem(
        "asistenciasPendientes"
    );

}

function sincronizarPendientes(){
console.log("Ejecutando sincronización...");

    const pendientes = obtenerPendientes();



    if(pendientes.length === 0){

        return;

    }



    console.log(
        "Pendientes encontrados:",
        pendientes.length
    );



    pendientes.forEach(datos=>{


        fetch(API, {


            method:"POST",


            headers:{


                "Content-Type":"text/plain;charset=utf-8"


            },


            body:JSON.stringify(datos)


        })


        .then(respuesta=>respuesta.json())


        .then(resultado=>{


    console.log(
        "Sincronizado:",
        resultado
    );


    alert(
        "✅ Asistencias sincronizadas correctamente."
    );


});


        .catch(error=>{


            console.log(
                "Todavía sin conexión",
                error
            );


        });


    });



    limpiarPendientes();


}
