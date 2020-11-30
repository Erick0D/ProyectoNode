window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-primary').addEventListener('click',login);
    }
    else{
        window.location.href = "sistema.html";
    }
}

function login(){
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
            username: user,
            password: pass
        }
    }).then(function(res) {
        if(res.data.code===200){
            localStorage.setItem("token",res.data.message);
            window.location.href = "sistema.html";
        }
        else{
            alert("Usuario y/o contraseña incorrectos");
        }
    }).catch(function(err){
        console.log(err);
    })
}