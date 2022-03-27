import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, gastosFiltro, filtro}) => {
  return (
    <div className='listado-gastos contenedor'>
       <h2>
         {filtro ? `Gastos filtrados por: ${filtro}` : (gastos.length ? 'Gastos' : 'No hay gastos aun')}
         
         
        </h2>

        {
        filtro ? (
          gastosFiltro.map(gasto => (
          <Gasto 
          key={gasto.id} 
          gasto={gasto}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
          />
          ))
          ) : (
            gastos.map(gasto => (
              <Gasto 
              key={gasto.id} 
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              />
              ))
          )
        }
      

    </div>
    
  )
}

export default ListadoGastos