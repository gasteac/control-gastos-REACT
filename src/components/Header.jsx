import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'


const Header = ({
  presupuesto, 
  setPresupuesto, 
  presupuestoOK, 
  setPresupuestoOK,
  gastos,
  setGastos,
  }) => {
  return (
    <header>
        <h1>Planificador de gastos</h1>
        <h4>Deslizar gastos para eliminar o editar.</h4>
        {presupuestoOK ? (
          <ControlPresupuesto
          presupuesto={presupuesto}
          gastos={gastos}
          setPresupuesto={setPresupuesto}
          setPresupuestoOK={setPresupuestoOK}
          setGastos={setGastos}
          />
        ) : <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setPresupuestoOK={setPresupuestoOK}
        />}
    </header>
  )
}

export default Header