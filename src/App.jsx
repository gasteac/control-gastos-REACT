import {useEffect, useState} from 'react'
import Header from './components/Header'
import NuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import {generarID} from './helpers'
import Filtros from './components/Filtros'


function App() {
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0)
  const [presupuestoOK, setPresupuestoOK] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [])
  const [gastoEditar, setGastoEditar] = useState({})
  const [gastosFiltro, setGastosFiltro] = useState([])
  const [filtro, setFiltro] = useState('')

  useEffect(()=>{
    if (filtro){

      const gastosFiltro = gastos.filter(gastosState => gastosState.categoria === filtro)
      setGastosFiltro(gastosFiltro)

    }
  },[filtro])


  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])
  
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if (presupuestoLS > 0){
      setPresupuestoOK(true)
    }
  }, [])

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

  const eliminarGasto = (id) => {
    const gastosAct = gastos.filter( gastoState => gastoState.id !== id);
    setGastos(gastosAct);
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
          setGastos={setGastos}
        />

        {presupuestoOK && 
        <>
        <main>

          <Filtros
          filtro={filtro}
          setFiltro={setFiltro}
          />
          <ListadoGastos
          eliminarGasto={eliminarGasto}
          setGastoEditar={setGastoEditar}
          gastos={gastos}
          gastosFiltro={gastosFiltro}
          filtro={filtro}
          
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