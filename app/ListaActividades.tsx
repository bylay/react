import { Actividad } from './FormReforestacion';
import { useState } from 'react';
import ReporteEcologico from './RpeorteEcologico';
import ComentariosActividad from './ComentariosActividad';

interface ListaProps {
    actividades: Actividad[];
    onEdit: (actividad: Actividad) => void;
    onDelete: (id: string) => void;
}

export default function ListaActividades({ actividades, onEdit, onDelete }: ListaProps) {
    const [actividadExpandida, setActividadExpandida] = useState<string | null>(null);
    const GOOGLE_MAPS_API_KEY = "AIzaSyArMcN_HLSJJ5IMLlP4P5C9CxG8akK5SSE";

    if (actividades.length === 0) {
        return <p className="textoc">No hay jornadas registradas</p>;
    }

    const toggleDetalles = (id: string) => {
        setActividadExpandida(actividadExpandida === id ? null : id);
    };

    return (
        <div className="g">
            <h2>Jornadas Registradas</h2>
            <div className='fila1'>
                {actividades.map(actividad => (
                    <div key={actividad.id} className='col'>
                        <div className='tarjeta'>
                            <div className='tbody'>
                                <h5>{actividad.titulo}</h5>
                                <h6>{actividad.fecha} | {actividad.tipoActividad}</h6>
                                <p className='Ttexto'>
                                    <strong>{actividad.arboles}</strong> árboles a plantar
                                </p>
                                
                                
                                <button 
                                    className="btn-detalles"
                                    onClick={() => toggleDetalles(actividad.id)}
                                >
                                    {actividadExpandida === actividad.id ? 'Menos detalles' : 'Más detalles'}
                                </button>
                                
                                
                                {actividadExpandida === actividad.id && (
                                    <div className="detalles-adicionales">
                                        
                                        {actividad.ubicacion && (
                                            <div className="mapa-mini">
                                                <small>Ubicación: </small>
                                                <img 
                                                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${actividad.ubicacion.lat},${actividad.ubicacion.lng}&zoom=14&size=200x100&markers=color:green%7C${actividad.ubicacion.lat},${actividad.ubicacion.lng}&key=${GOOGLE_MAPS_API_KEY}`} 
                                                    alt="Mapa ubicación"
                                                    className="img-fluid"
                                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                                />
                                                <p className="coordenadas">
                                                    {actividad.ubicacion.lat.toFixed(4)}, {actividad.ubicacion.lng.toFixed(4)}
                                                </p>
                                            </div>
                                        )}

                                        
                                        {actividad.descripcion && (
                                            <div className="descripcion-detallada">
                                                <h6>Descripción:</h6>
                                                <p>{actividad.descripcion}</p>
                                            </div>
                                        )}

                                        
                                        <div className="modulos-adicionales">
                                            <ReporteEcologico actividadId={actividad.id} />
                                            <ComentariosActividad actividadId={actividad.id} />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='foter'>
                                <button
                                    className='edit'
                                    onClick={() => onEdit(actividad)}
                                >
                                    Editar
                                </button>
                                <button
                                    className='delete'
                                    onClick={() => onDelete(actividad.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}