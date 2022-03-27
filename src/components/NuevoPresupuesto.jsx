import {useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({
  presupuesto, 
  setPresupuesto, 
  setPresupuestoOK
  }) => {

  const [mensaje, setMensaje] = useState('')

  const handlePresupuesto=(e)=>{
    e.preventDefault();
    if (!presupuesto || presupuesto<0){
      setMensaje('No es un presupuesto valido');
      return;
    }
    setMensaje('')
    setPresupuestoOK(true)

  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
          <label>Definir presupuesto</label>
          <input
            className='nuevo-presupuesto'
            type="number"
            placeholder='Agrega tu presupuesto'
            value={presupuesto == 0 ? '' : presupuesto}
            onChange={e=>setPresupuesto(Number(e.target.value))}
          />
        </div>
        <input
        type="submit"
        value="agregar"
        />
        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto