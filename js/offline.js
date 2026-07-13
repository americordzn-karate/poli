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
