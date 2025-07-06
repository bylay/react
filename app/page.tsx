'use client'
import FormReforestacion from "./FormReforestacion"
import { useState, useEffect } from "react"
import ListaActividades from "./ListaActividades"

interface Actividad {
  id: string;
  titulo: string;
  arboles: number;
  tipoActividad: string;
  fecha: string;
}

export default function Home() {
  const [ActividadActual, setActividadActual] = useState<Actividad | null>(null);
  const [actividades, setActividades] = useState<Actividad[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('actividadesReforestacion');
    if (storedData) {
      setActividades(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('actividadesReforestacion', JSON.stringify(actividades)); 
  }, [actividades]);

  const handleAddActividad = (nuevaActividad: Omit<Actividad, 'id'>) => {
    const actividadId: Actividad = {
      ...nuevaActividad,
      id: Date.now().toString()
    };
    setActividades(prev => [...prev, actividadId]);
  };

  const handleEditActividad = (updateActividad: Actividad) => {
    setActividades(prev => 
      prev.map(a => a.id === updateActividad.id ? updateActividad : a)
    )
  }

  const handleDeleteActividad = (id: string) => {
    setActividades(prev => prev.filter(a => a.id !== id))
  }

  return(
    <div className="t1">
      <h1 className="centro">Gestion de Jornadas de Reforestación</h1>
      <div className="fila">
        <div className="col">
          <FormReforestacion 
              ActividadActual={ActividadActual}
              onSave={ActividadActual ? handleEditActividad : handleAddActividad}/>
        </div>
        <div className="col2">
          <ListaActividades 
              actividades={actividades}
              onEdit={setActividadActual}
              onDelete={handleDeleteActividad}/>
        </div>
      </div>
    </div>
  )
}