import { async } from "@firebase/util";
import React from "react";
import {firebase} from "./firebase"

function App() {
  
  const [tareas, setTareas] = React.useState([])
  const [tarea, setTarea] = React.useState('')


  React.useEffect(() => {
  
      const obtenerDatos = async () => {
          const db = firebase.firestore()
          try {
              const data = await db.collection('tareas').get()
              const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
              console.log(arrayData) 
              setTareas(arrayData)     
          } catch (error) {
              console.log(error)
          }
      }
      obtenerDatos()
  
  }, [])


const agregar = async (e) => {
    e.preventDefault()
    if(!tarea.trim()){
        console.log('sin texto')
        return
    }
    try{
      const dataBase = firebase.firestore()
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now()
      }
      const data = await dataBase.collection("tareas").add(nuevaTarea)
      setTareas([
        ...tareas,
        {
          ...nuevaTarea, id: data.id
        }
      ])
      setTarea("")

    } catch(error){
      console.log(error)
    }
    console.log(tarea)
}

  return (

    <div className="container mb-2">
    <div className="row">
        <div className="col-md-6">
            <h3>Lista de Tareas</h3>
            <ul className="list-group">
            {
                tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span>{item.name}</span>
                    <button 
                        className="btn btn-danger btn-sm float-end"
                    >
                        Eliminar
                    </button>
                    <button 
                        className="btn btn-warning btn-sm float-end me-2"
                    >
                        Editar
                    </button>
                </li>
                ))
            }
            </ul>
        </div>
        <div className="col-md-6">
            <h3>Formulario</h3>
            <form onSubmit={agregar}>
    <input 
        type="text" 
        className="form-control mb-2"
        placeholder='Ingrese Tarea'
        value={tarea}
        onChange={e => setTarea(e.target.value)}
    />
    <button 
        type='submit'
        className="btn btn-dark btn-block btn-sm"
    >
        Agregar
    </button>
    </form>
        </div>
    </div>
</div>
  );
}

export default App;
