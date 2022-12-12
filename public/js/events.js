
//Funcion para registrar el usuario

function insertUser() {
    user = $("#user").val(),
    pass = $("#pass").val(),
    perfil = $("#perfil").val()

    if (!user || !pass || !perfil) {
        Swal.fire({
          icon: 'warning',
          title: '!Advertencia',
          text: 'Todos los campos deben ser diligenciados',
          showConfirmButton: true,
        })
    } else {
            $.ajax({
            url: 'http://localhost:4000/insertUser',
            type: 'POST',
            data: {
                'user': user,
                'pass': pass,
                'perfil': perfil
            },
            
            success: function(respuesta) {
              Swal.fire({
                icon: 'success',
                title: 'Bien hecho',
                text: 'El usuario se registro correctamente 🙂',
                showConfirmButton: false,
                timer: 2000
              })
              $("#user").val(' ')
              $("#pass").val(' ')
              $("#perfil").val(' ')
              // setInterval("location.reload()",1000);
            },
            error: function() {
            }
          })
        }
}


// Funcion para registrar la pelicula

function insertMovie() {

  namepeli = $("#namepeli").val(),
  sipn = $("#sipn").val(),
  anio = $("#anio").val()

    if (!namepeli || !sipn || !anio) {
        Swal.fire({
          icon: 'warning',
          title: '!Advertencia',
          text: 'Todos los campos deben ser diligenciados',
          showConfirmButton: true,
        })
    } else {
            $.ajax({
            url: 'http://localhost:4000/insertMovie',
            type: 'POST',
            data: {
                'namepeli': namepeli,
                'sipn': sipn,
                'anio': anio
            },
            
            success: function(respuesta) {
              Swal.fire({
                icon: 'success',
                title: 'Bien hecho',
                text: 'La pelicula se registro correctamente 🙂',
                showConfirmButton: false,
                timer: 2000
              })
              $("#namepeli").val(' ')
              $("#sipn").val(' ')
              $("#anio").val(' ')
               setInterval("location.reload()",1000);
            },
            error: function() {
            }
          })
        }
    
}

function mostrarRegistros() {
    fetch("http://localhost:4000/queryUsers")
    .then((response)=>response.json())
    .then((lisuser)=>{
        let tablapersonal = document.querySelector('#tablaPersonal tbody');

        for (const itemtbl of lisuser) {
            let tr = "<tr> <td><small>" + itemtbl.user + "</small></td> <td><small>" + itemtbl.pass + "</small></td> <td><small>" + itemtbl.perfil + "</small></td><td><button class='btn btn-primary btn-sm'><i class='fa fa-automobile'></i><small>Editar</small></button><button class='btn btn-danger btn-sm'><i class='fa fa-automobile'></i><small>eliminar</small></button></td> </tr>";

            tablapersonal.innerHTML += tr; 
            
        }
    })
}

mostrarRegistros();