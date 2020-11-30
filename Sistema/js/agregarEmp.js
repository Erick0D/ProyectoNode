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

function guardar(){
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

    axios.post(
        url+"/empleado", 
        body, headers
    ).then(function(res) {
        console.log(res);
        alert("Empleado agregado");
        window.location.href = "sistema.html";
    }).catch(function(err){
        console.log(err);
    })
}