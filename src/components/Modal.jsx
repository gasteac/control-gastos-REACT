import cerrarModal from '../img/cerrar.svg'
import {useState} from 'react'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto}) => {

const [nombre, setNombre] = useState('')
const [cantidad, setCantidad] = useState('')
const [categoria, setCategoria] = useState('')
const [mensaje, setMensaje] = useState('')

const ocultarModal=()=>{
    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
    }, 300);
}

const handleSubmit =e =>{
    e.preventDefault();
    
    if (([nombre, categoria].includes('')) || cantidad <= 0){
        setMensaje('rellene todos los campos')
        return;
    } 
    guardarGasto({
    nombre,
    cantidad,
    categoria
    })
    
}

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img src={cerrarModal} alt='cerrar' onClick={ocultarModal}/>
        </div>
        <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
            <legend>Nuevo gasto</legend>
            <div className='campo'>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <label htmlFor='nombre'>Nombre Gasto</label>
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
                value="Agregar gasto"
                onChange={handleSubmit}
            />
        </form>
    </div>
  )
}

export default Modal