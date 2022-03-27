import {useEffect, useState} from 'react'
import React from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, gastos, setResetear, setGastos, setPresupuesto, setPresupuestoOK}) => {

const resetearApp = () => {
  const resultado = confirm('Desea resetear su cartera y gastos?')
  if (resultado){
    setGastos([])
    setPresupuesto(0)
    setPresupuestoOK(false)
    setResetear(0)
    localStorage.clear()
    }
  }
  
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto)=>gasto.cantidad + total, 0);
    const totalDisponible = presupuesto - totalGastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) * 100) / presupuesto).toFixed(2) ;
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
            styles={
              buildStyles({
              pathColor: porcentaje > 100 ? 'red' : 'var(--azul)',
              textColor: porcentaje > 100 ? 'red' : 'var(--azul)',
              })}
            text={`Gastado: ${porcentaje}%`}
            value={porcentaje}
            />
        </div>
        <div className='contenido-presupuesto'>
            <button
            className='reset-app'
            onClick={resetearApp}
            >Resetear gastos</button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p  className={`${disponible < 0 ? 'negativo': ''}`}>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto;