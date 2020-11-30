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
        loadEmpleado();
    }
    else{
        window.location.href = "index.html";
    }
}

function loadEmpleado() {
    axios.get(url + "/empleado", headers)
    .then(function(res) {
        console.log(res);
        displayEmpleado(res.data.message);
    }).catch(function(err) {
        console.log(err);
    })
}

function displayEmpleado(empleado){
    var table = document.querySelector(".empleados");
    for(var i = 0; i < empleado.length; i++) {
        table.innerHTML += `
        <tr>
          <td>${empleado[i].nombre}</td>
          <td>${empleado[i].apellidos}</td>
          <td>${empleado[i].tel}</td>
          <td>${empleado[i].email}</td>
          <td>${empleado[i].direccion}</td>
        </tr>`;
    }
}