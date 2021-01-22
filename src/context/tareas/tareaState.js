import React, { useReducer } from 'react'
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'
import {v4 as uuid} from 'uuid'

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from './../../types'

const TareaState = props => {
  const initialState = {
    tareas: [
      { id: 9, nombre: 'dormir', estado: true, proyectoId: 1},
      { id: 1, nombre: 'despertar', estado: false, proyectoId: 2},
      { id: 2, nombre: 'desayuno', estado: false, proyectoId: 3},
      { id: 3, nombre: 'limpiar escritorio', estado: true, proyectoId: 4},
      { id: 4, nombre: 'asda', estado: true, proyectoId: 4},
      { id: 6, nombre: 'dormqewrir', estado: true, proyectoId: 1},
      { id: 5, nombre: 'tretre', estado: false, proyectoId: 1},
      { id: 7, nombre: 'hrhr', estado: false, proyectoId: 2},
      { id: 8, nombre: 'ee escritorio', estado: true, proyectoId: 3}
    ],
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada : null
  }

  const [state, dispatch] = useReducer(TareaReducer, initialState)

  // crear las funciones

  // obtener las tareas de un proyecto
  console.log(state.tareas)

  const obtenerTareas = proyectoId => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId
    })
  }

  // agregar una tarea
  const agregarTarea = tarea => {
    tarea.id = uuid()
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea
    })
  }

  // valida y muestra un error en caso de fallar validacion
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    })
  }

  // eliminar tarea por id
  const eliminarTarea = id => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id
    })
  }

  const cambiarEstadoTarea = tarea => {
    dispatch({
      type: ESTADO_TAREA,
      payload: tarea
    })
  }

  // extrae tarea actual al state
  const guardarTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    })
  }

  // editar tarea
  const actualizarTarea = tarea => {
    dispatch({
      type: ACTUALIZAR_TAREA,
      payload: tarea
    })
  }

  // elimina tarea seleccionada
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA
    })
  }

  return (
    <TareaContext.Provider
      value= {{
        tareas: state.tareas,
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        cambiarEstadoTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  )
}

export default TareaState