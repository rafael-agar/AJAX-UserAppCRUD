const btn_cargar = document.getElementById('btn_cargar_usuarios'),
    error_box = document.getElementById('error_box'),
    loader = document.getElementById('loader'),
    tabla = document.getElementById('tabla'),
    eliminar = document.getElementById('eliminar');

let usuario_nombre,
    usuario_edad,
    usuario_pais,
    usuario_correo,
    usuario_id;

btn_cargar.addEventListener('click', function(){
    cargarUsuarios();
});

formulario.addEventListener('submit', function(e) {
    agregarUsuarios(e);
});

function cargarUsuarios() {
    tabla.innerHTML = `
    <tr>
        <th>id</th>
        <th>Nombre</th>
        <th>Edad</th>
        <th>Pais</th>
        <th>Correo</th>
        <th>Action</th>
    </tr>
    `;

    const peticion = new XMLHttpRequest();
    peticion.open('GET', 'php/leer-datos.php');

    loader.classList.add('active');

    peticion.onload = function() {
    try {
        const datos = JSON.parse(peticion.responseText);
        // console.log(datos);

        if(datos === 'error'){
            error_box.classList.add('active');
        } else {
            for (let i = 0; i < datos.length; i++) {
                const elemento = document.createElement('tr');
                elemento.innerHTML += `
                    <td> ${datos[i].id} </td>
                    <td> ${datos[i].nombre} </td>
                    <td> ${datos[i].edad} </td>
                    <td> ${datos[i].pais} </td>
                    <td> ${datos[i].correo} </td>
                    <td><button class="btn btn-eliminar" onclick="eliminarUsuarios(${datos[i].id})">Eliminar</button></td>
                `;
                tabla.appendChild(elemento);
            }
        }
    } catch (error) {
        // console.error('Error parsing JSON:', error);
        error_box.classList.add('active');
    }
    };

    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status == 200) {
            loader.classList.remove('active');
        }
    }

    peticion.send();

}

function agregarUsuarios(e) {
    e.preventDefault();

    // const {nombre, edad, pais, correo} = formulario;

    const peticion = new XMLHttpRequest();
    peticion.open('POST', 'php/insertar-usuarios.php');

    usuario_nombre = formulario.nombre.value.trim();
    usuario_edad = parseInt(formulario.edad.value.trim());
    usuario_pais = formulario.pais.value.trim();
    usuario_correo = formulario.correo.value.trim();

    if(formulario_valido()) {
        error_box.classList.remove('active');

        let parametros = 'nombre='+ usuario_nombre + '&edad='+ usuario_edad +'&pais='+ usuario_pais +'&correo=' + usuario_correo;

        peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        loader.classList.add('active');

        peticion.onload = function() {
            cargarUsuarios();
            formulario.nombre.value = '';
            formulario.edad.value = '';
            formulario.pais.value = '';
            formulario.correo.value = '';
        }

        peticion.onreadystatechange = function() {
            if(peticion.readyState == 4 && peticion.status == 200) {
                loader.classList.remove('active');
            }
        }

        peticion.send(parametros);

    } else {
        error_box.classList.add('active');
        error_box.innerHTML = "Completa el fomulario";
    }

}

function eliminarUsuarios(id) {

    

    const peticion = new XMLHttpRequest();
    peticion.open('POST', 'php/eliminar-usuario.php');

    const usuario_id = id;
    const parametros = 'id=' + encodeURIComponent(usuario_id);

    peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    peticion.onload = function() {
        if (peticion.status === 200) {
            cargarUsuarios();
            formulario.nombre.value = '';
            formulario.edad.value = '';
            formulario.pais.value = '';
            formulario.correo.value = '';
        }
    };

    peticion.onreadystatechange = function() {
        if (peticion.readyState === 4) {
            loader.classList.remove('active');
        }
    };

    loader.classList.add('active');
    peticion.send(parametros);
}


function formulario_valido() {
    if (usuario_nombre == '') {
        return false;
    } else if (isNaN(usuario_edad)) {
        return false;
    }else if (usuario_pais == '') {
        return false;
    }else if (usuario_correo == '') {
        return false;
    }

    return true;
}