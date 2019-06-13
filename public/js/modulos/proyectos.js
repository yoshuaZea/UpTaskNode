import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

//Si existe el elemento
if(btnEliminar){
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;

        // console.log(urlProyecto);

        Swal.fire({
            title: '¿Deseas eliminar este proyecto?',
            text: "Un proyecto eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.value) {
                //Enviar petición a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;

                axios.delete(url, {params: {urlProyecto}})
                    .then(function(respuesta){
                        console.log(respuesta);
                        // return;
                        
                        Swal.fire(
                            'Proyecto eliminado!',
                            respuesta.data,
                            'success'
                        );
                
                        setTimeout(() => {
                            window.location.href = '/';
                        }, 3000);
                    })
                    .catch(() => {
                        Swal.fire({
                            type:'error',
                            tittle: 'Ups! Hubo un error',
                            text: 'No se pudo eliminar el proyecto'
                        })
                    })
            }
        });
    });
}

export default btnEliminar;