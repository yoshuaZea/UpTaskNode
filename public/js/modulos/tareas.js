import axios from "axios";
import Swal from "sweetalert2";

const tareas = document.querySelector('.listado-pendientes');

if(tareas){
    tareas.addEventListener('click', (e) => {
        if(e.target.classList.contains('fa-check-circle')){
            //Extraer el ID de tarea
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            //Request a tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;
            
            axios.patch(url, { idTarea })
                .then(function(respuesta){
                    if(respuesta.status === 200){
                        //Cambiar estado del icono
                        icono.classList.toggle('completo');
                    }
                })
                .catch(function(){

                })
        }

        if(e.target.classList.contains('fa-trash')){
            const tareaHTML = e.target.parentElement.parentElement,
                    idTarea = tareaHTML.dataset.tarea;
            
            Swal.fire({
                title: '¿Deseas borrar este tarea?',
                text: "Una tarea eliminado no se puede recuperar",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.value) {
                    //Construimos la URL
                    const url = `${location.origin}/tareas/${idTarea}`;

                    //Enviar el delete por medio de axios
                    axios.delete(url, { params: { idTarea } })
                        .then(function(respuesta){
                            if(respuesta.status === 200){
                                //Eliminar el nodo
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                //Opcional una alerta
                                Swal.fire(
                                    'Tarea Eliminada',
                                    respuesta.data,
                                    'success'
                                )
                            }
                        });
                }
            });
        }
    });
}

export default tareas;
