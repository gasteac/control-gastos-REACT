import {useEffect, useState} from 'react'
import React from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { build } from 'vite'

const ControlPresupuesto = ({presupuesto, gastos}) => {

  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto)=>gasto.cantidad + total, 0);
    const totalDisponible = presupuesto - totalGastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) * 100) / presupuesto).toFixed(2) ;
    console.log(nuevoPorcentaje)
    setDisponible(totalDisponible)
    setGastado(totalGastado);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 800);
  }, [gastos])
  
  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {style: 'currency', currency:'USD'})

  }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
            styles={buildStyles({
              pathColor: '#ffff',
            })}
            text={`Gastado: ${porcentaje}%`}
            value={porcentaje}
            />
        </div>
        <div className='contenido-presupuesto'>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto