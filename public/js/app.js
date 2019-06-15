import proyectos from './modulos/proyectos';
import tareas from './modulos/tareas';
import { actualizarAvance } from './funciones/avance';

//Silimar al $(document).ready()
document.addEventListener('DOMContentLoaded', () => {
    actualizarAvance();
});