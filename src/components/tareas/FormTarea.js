import React, { useContext, useState, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {

  const proyectosContext = useContext(proyectoContext)
  const { proyecto } = proyectosContext

  const tareasContext = useContext(tareaContext)
  const { tareaSeleccionada, errorTarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext

  const [tarea, setTarea] = useState({ nombre: ''})


  // detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaSeleccionada !== null) {
      setTarea(tareaSeleccionada)
    }
    else {
      setTarea({
        nombre: ''
      })
    }
  }, [tareaSeleccionada])
  // extraer nombre del proyecto

  const { nombre } = tarea

  if (!proyecto) return null

  const [ proyectoActual ] = proyecto

  const handleChange = e => {
    setTarea({
      ...tarea,
      [e.target.name] : e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    
    // validar
    if (nombre.trim() === '') {
      validarTarea()
      return
    }
    //pasar validacion
    if (tareaSeleccionada === null){
      // agregar la nueva tarea al state
      agregarTarea({
        ...tarea,
        proyectoId : proyectoActual.id,
        estado : false
      })
    }
    else {
      actualizarTarea(tarea)
      limpiarTarea()
    }
    
    // actualizar pagina
    obtenerTareas(proyectoActual.id)
    // reiniciar form 
    setTarea({ nombre: ''})

  }

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre tarea..."
            className="input-text"
            value={nombre}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaSeleccionada? "Editar tarea" : "Agregar tarea"}
          />
        </div>
      </form>
      {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
    </div>
  )
}

export default FormTarea
