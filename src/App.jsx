import { async } from "@firebase/util";
import React from "react";
import {firebase} from "./firebase"

function App() {
  
  const [tareas, setTareas] = React.useState([])

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
        </div>
    </div>
</div>
  );
}

export default App;
