import {useEffect, useState} from 'react'
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
  const [gastoEditar, setGastoEditar] = useState({})

  useEffect(()=>{
    if (Object.keys(gastoEditar).length > 0){
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
      }, 500)
    }
  },[gastoEditar])


  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {

    if (gasto.id) {
      
      const gastosAct = gastos.map(gastoAEditar => gastoAEditar.id === gasto.id ? gasto : gastoAEditar)
      setGastos(gastosAct)
      console.log(gastosAct)
      setGastoEditar({})
      
    } else{
    gasto.id = generarID();
    gasto.fecha = (new Date(Date.now())).toLocaleDateString('es-ES');
    setGastos([...gastos, gasto])
    }
      setAnimarModal(false)
      setTimeout(() => {
          setModal(false)
      }, 300);
  }
  return (
    <div className={modal ? 'fijar' : ''}>
        <Header
          gastos={gastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          presupuestoOK={presupuestoOK}
          setPresupuestoOK={setPresupuestoOK}
        />

        {presupuestoOK && 
        <>
        <main>
          <ListadoGastos
          setGastoEditar={setGastoEditar}
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
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
        />}
        
    </div>
  )
}

export default App