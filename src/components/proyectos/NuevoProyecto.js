import React, { useContext, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {

  const proyectosContext = useContext(proyectoContext)
  const {
    formulario,
    errorFormulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError
  } = proyectosContext

  const proyectoVacio = {
    nombre: ''
  }
  const [proyecto, setProyecto] = useState(proyectoVacio)
  const { nombre } = proyecto
  
  const onChangeProyecto = e => {
    setProyecto({
      ...proyecto,
      [e.target.name] : e.target.value
    })
  }

  const onSubmitProyecto = e => {
    e.preventDefault()
    // Validar
    if (nombre === '')  {
      mostrarError()
      return null
    }
    // agregar al state
    agregarProyecto(proyecto)
    setProyecto(proyectoVacio)
  }


  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => mostrarFormulario()}
      >
        Nuevo proyecto
      </button>
      {
        formulario
        ? (
          <form
            className="formulario-nuevo-proyecto"
            onSubmit={onSubmitProyecto}
          >
            <input
              type="text"
              className="input-text"
              placeholder="Nombre proyecto"
              name="nombre"
              value={nombre}
              onChange={onChangeProyecto}
              />
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Agregar proyecto"
            />
          </form>
        )
        : null
      }
      { errorFormulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
    </>
  )
}

export default NuevoProyecto
