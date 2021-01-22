import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListadoProyectos = () => {

  // extraer proyectos de state inicial
  const proyectosContext = useContext(proyectoContext)
  const { proyectos, obtenerProyectos } = proyectosContext
  
  useEffect(() => {
      obtenerProyectos()
  }, [])

  // check si hay proyectos
  if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>

  return (
    <ul className="listado-proyectos">
     <TransitionGroup>
        { proyectos.map(proyecto => (
          <CSSTransition
            key={proyecto.id}
            classNames="proyecto"
            timeout={200}
          >
            <Proyecto
              proyecto={proyecto}
            />
          </CSSTransition>
        ))}
      </TransitionGroup> 

    </ul>
  )
}

export default ListadoProyectos
