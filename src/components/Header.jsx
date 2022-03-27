import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'


const Header = ({
  presupuesto, 
  setPresupuesto, 
  presupuestoOK, 
  setPresupuestoOK
  }) => {
  return (
    <header>
        <h1>Planificador de gastos</h1>
        {presupuestoOK ? (
          <ControlPresupuesto
          presupuesto={presupuesto}
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