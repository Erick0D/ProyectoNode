window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if(localStorage.getItem("token")){
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
    }
    else{
        window.location.href = "index.html";
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function guardar(){ 
    var empleado= getParameterByName('id');
    putEmpleado(empleado);
}

function putEmpleado(empleado){
    var n = document.getElementById('nombre').value;
    var a = document.getElementById('apellidos').value;
    var t = document.getElementById('tel').value;
    var e = document.getElementById('email').value;
    var d = document.getElementById('direccion').value;

    const body = {
        nombre: n,
        apellidos: a,
        tel: t,
        email: e,
        direccion: d
    }

    axios.put(
        url+"/empleado/"+empleado, 
        body, headers
    ).then(function(res) {
        console.log(res);
        alert("Empleado modificado");
        window.location.href = "sistema.html";
    }).catch(function(err){
        console.log(err);
    })
}