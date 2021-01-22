import React, { useReducer } from 'react';

import {v4 as uuid} from 'uuid'

import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import { 
  AGREGAR_PROYECTO, 
  FORMULARIO_PROYECTO, 
  OBTENER_PROYECTOS, 
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO
 } from '../../types'


const ProyectoState = props => {

  const proyectos = [
    {id: 1, nombre: 'Cubitos'},
    {id: 2, nombre: 'Ceres'},
    {id: 3, nombre: 'Alebon'}
  ]
  
  const initialState = {
    proyectos : [],
    formulario : false,
    errorFormulario: false,
    proyecto: null
  }

  const [state, dispatch] = useReducer(proyectoReducer, initialState)

  // Serie de funciones para el CRUD

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    })
  }

  const obtenerProyectos = () => {
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: proyectos
    })
  }

  // Agregar nuevo proyecto

  const agregarProyecto = proyecto => {
    proyecto.id = uuid()

    // insertar el nuevo proyecto en el state
    dispatch({
      type: AGREGAR_PROYECTO,
      payload: proyecto
    })
  }

  // Valida formulario
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    })
  }

  // selecciona el proyecto en que el usuario dió click
  const proyectoActual = proyectoId => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId
    })
  }

  // Elimina un proyecto
  const eliminarProyecto = proyectoId => {
     dispatch({
       type: ELIMINAR_PROYECTO,
       payload: proyectoId
     })
  }

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      { props.children }
    </proyectoContext.Provider>
  )
}

export default ProyectoState