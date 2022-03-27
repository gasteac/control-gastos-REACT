import React, {useEffect, useState} from 'react'
import Header from './components/Header'
import NuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import {generarID} from './helpers'


function App() {
  const [presupuesto, setPresupuesto] = useState(0)
  const [presupuestoOK, setPresupuestoOK] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState([])

  const handleNuevoGasto = () => {
    setModal(true)
    setTimeout(() => {
      setAnimarModal(true)
    }, 300);
  }

  const guardarGasto = gasto => {
    gasto.id = generarID();
    gasto.fecha = (new Date(Date.now())).toLocaleDateString('es-ES');
    setGastos([...gastos, gasto]);
      setAnimarModal(false)
      setTimeout(() => {
          setModal(false)
      }, 300);
  }
  return (
    <div className={modal && 'fijar'}>
        <Header
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          presupuestoOK={presupuestoOK}
          setPresupuestoOK={setPresupuestoOK}
        />

        {presupuestoOK && 
        <>
        <main>
          <ListadoGastos
          gastos={gastos}
          />
        </main>
        <div className='nuevo-gasto'>
        <img 
        onClick={handleNuevoGasto}
        src={NuevoGasto} 
        alt='iconoGasto'></img>
        </div>
        </>
        }

        {modal && <Modal 
        modal={modal} 
        setModal={setModal} 
        setAnimarModal={setAnimarModal} 
        animarModal={animarModal}
        guardarGasto={guardarGasto}
        />}
        
    </div>
  )
}

export default App