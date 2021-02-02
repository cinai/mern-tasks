import React, { useReducer } from 'react'
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'
import clienteAxios from '../../config/axios'

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from './../../types'

const TareaState = props => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada : null
  }

  const [state, dispatch] = useReducer(TareaReducer, initialState)

  // crear las funciones

  // obtener las tareas de un proyecto
  const obtenerTareas = async proyecto => {
    try {
      const resultado = await clienteAxios.get('/api/tareas', {
        params: { proyecto }
      })
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas
      })
    } catch (error) {
      console.log(error)
    }
  }

  // agregar una tarea
  const agregarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.post('/api/tareas', tarea)
      console.log(resultado)
      dispatch({
        type: AGREGAR_TAREA,
        payload: resultado.data.tarea
      })
    } catch (error) {
      console.log(error)
    }
  }

  // valida y muestra un error en caso de fallar validacion
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    })
  }

  // eliminar tarea por id
  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, {
        params: {
          proyecto
        }
      })
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      })
      
    } catch (error) {
      console.log(error)
    }

  }

  // editar tarea
  const actualizarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea
      })
    } catch (error) {
      console.log(error)
    }
  }

  // extrae tarea actual al state
  const guardarTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
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
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
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