import React, { useContext } from 'react'
import tareaContext from '../../context/tareas/tareaContext'

const Tarea = ({ tarea }) => {

  const tareasContext = useContext(tareaContext)
  const { eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual } = tareasContext
  
  // funcion que se ejecuta cuando el usuario presiona boton eliminar
  const handleEliminar = e => {
    eliminarTarea(tarea.id)
    obtenerTareas(tarea.proyectoId)
  }

  // funcion que modifica estado de tarea
  const cambiarEstado = tarea => {
    if (tarea.estado) {
      tarea.estado = false
    } else {
      tarea.estado = true
    }
    cambiarEstadoTarea(tarea)
    obtenerTareas(tarea.proyectoId)
  }

  // guarda tarea en el state
  const editarTarea = tarea => {
    guardarTareaActual(tarea)
  }

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado
        ? (
            <button
              type="button"
              className="completo"
              onClick={() => cambiarEstado(tarea)}
            >Completo </button>
          ) 
        : (
          <button
            type="button"
            className="incompleto"
            onClick={() => cambiarEstado(tarea)}
          >Incompleto </button>
          ) 
        }
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => editarTarea(tarea)}
        >Editar</button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={handleEliminar}
        >Eliminar</button>
      </div>
    </li>
  )
}

export default Tarea
