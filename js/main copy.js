const btn_cargar = document.getElementById('btn_cargar_usuarios');
const error_box = document.getElementById('error_box');
const loader = document.getElementById('loader');
const tabla = document.getElementById('tabla');

let usuario_nombre,
    usuario_edad,
    usuario_pais,
    usuario_correo;

btn_cargar.addEventListener('click', function(){
    const peticion = new XMLHttpRequest();
    // peticion.open('GET', 'https://api.npoint.io/a3dfabbd783743385c8c');
    peticion.open('GET', 'php/leer-datos.php');

    loader.classList.add('active');

    peticion.onload = function() {
        // console.log(JSON.parse(peticion.responseText)[4])
        const datos = JSON.parse(peticion.responseText);

        // datos.forEach(persona => {
        //     const elemento = document.createElement('tr');
        //     elemento.innerHTML += `
        //         <td> ${persona.id} </td>
        //         <td> ${persona.nombre} </td>
        //         <td> ${persona.edad} </td>
        //         <td> ${persona.pais} </td>
        //         <td> ${persona.correo} </td>
        //     `;
        //     document.getElementById('tabla').appendChild(elemento);
        // });

        // todos: < datoss.length
        for (let i = 0; i < 5; i++) {
            const elemento = document.createElement('tr');
            elemento.innerHTML += `
                <td> ${datos[i].id} </td>
                <td> ${datos[i].nombre} </td>
                <td> ${datos[i].edad} </td>
                <td> ${datos[i].pais} </td>
                <td> ${datos[i].correo} </td>
            `;
            document.getElementById('tabla').appendChild(elemento);
        }

    }

    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status == 200) {
            loader.classList.remove('active');
        }
    }

    peticion.send();
})
