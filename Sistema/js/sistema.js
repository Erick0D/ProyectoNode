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

function deleteEmpleado(empleado) {
    axios.delete(url + "/empleado/"+empleado, headers)
    .then(function(res) {
        console.log(res);
        location.reload();
    }).catch(function(err) {
        console.log(err);
    })
}

function buscarEmp(nombre) {
    axios.get(url + "/empleado/" + nombre, headers)
    .then(function(res) {
        console.log(res);
        displaySearch(res.data.message);
    }).catch(function(err) {
        console.log(err);
    })
}

function displaySearch(empleado){
    var table = document.querySelector(".empleados");
    for(var i = 0; i < empleado.length; i++) {
        table.innerHTML = `
        <tr>
          <td>${empleado[i].nombre}</td>
          <td>${empleado[i].apellidos}</td>
          <td>${empleado[i].tel}</td>
          <td>${empleado[i].email}</td>
          <td>${empleado[i].direccion}</td>
          <td>
          <a href="javascript:deleteEmpleado(${empleado[i].id});">Eliminar</a>
          <a href="../Sistema/modificarEmp.html?id=${empleado[i].id}">Modificar</a>
      </td>
        </tr>`;
    }
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
          <td>
          <a href="javascript:deleteEmpleado(${empleado[i].id});">Eliminar</a>
          <a href="../Sistema/modificarEmp.html?id=${empleado[i].id}">Modificar</a>
      </td>
        </tr>`;
    }
}

function buscar(){
    var nombre = document.getElementById('nombre').value;
    buscarEmp(nombre);
}