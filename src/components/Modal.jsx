import cerrarModal from '../img/cerrar.svg'
import {useState, useEffect} from 'react'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar}) => {
const [mensaje, setMensaje] = useState('')
const [nombre, setNombre] = useState('')
const [cantidad, setCantidad] = useState('')
const [categoria, setCategoria] = useState('')
const [fecha, setFecha] = useState('')
const [id, setid] = useState('')

useEffect(()=>{
    if (Object.keys(gastoEditar).length > 0){
        setNombre(gastoEditar.nombre)
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setid(gastoEditar.id)
        setFecha(gastoEditar.fecha)
      }
},[])

const ocultarModal=()=>{
    setAnimarModal(false)
    setGastoEditar({})
    setTimeout(() => {
        setModal(false)
    }, 300);
}

const handleSubmit =e =>{
    e.preventDefault();
    if (([nombre, categoria].includes('')) || cantidad <= 0){
        setMensaje('Rellene todos los campos')
        return;
    } 

    guardarGasto({nombre, cantidad, categoria, id, fecha})
    
}

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img src={cerrarModal} alt='cerrar' onClick={ocultarModal}/>
        </div>
        <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
            <legend>{Object.keys(gastoEditar).length > 0 ? "Editar Gasto" : "Agregar Gasto"}</legend>
            <div className='campo'>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <label htmlFor='nombre'>Nombre</label>
                <input
                id='nombre'
                type="text"
                placeholder='Nombre del gasto'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className='campo'>
                <label htmlFor='cantidad'>Cantidad</label>
                <input
                id='cantidad'
                type="number"
                placeholder='Cantidad del gasto. Ej: 300'
                value={cantidad}
                onChange={e => setCantidad(Number(e.target.value))}
                />
            </div>
            <div className='campo'>
                <label htmlFor='categoria'>Categoria</label>
                <select
                id='categoria'
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
                >
                    <option value="">--- Seleccione ---</option>
                    <option value="comida">Comida</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="salud">Salud</option>
                    <option value="casa">Casa</option>
                    <option value="ocio">Ocio</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="suscripciones">Suscripciones</option>

                </select>
            </div>
            <input
                type="submit"
                value={Object.keys(gastoEditar).length > 0 ? "Editar Gasto" : "Agregar Gasto"}
            />
        </form>
    </div>
  )
}

export default Modal