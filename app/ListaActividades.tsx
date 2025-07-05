    import {Actividad} from './FormReforestacion'

    interface ListaProps {
        actividades: Actividad[];
    }

    export default function ListaActividades({actividades}: ListaProps) {
        if (actividades.length === 0) {
            return <p className="textoc">No hay jornadas registradas</p>;
    }

    return (
        <div className="g">
            <h2>Jornadas Registradas</h2>
            <div className='fila1'>
                {actividades.map(actividad => (
                    <div key={actividad.id} className='col'>
                        <div className='tarjeta'>
                            <div className='tbody'>
                                <h5>{actividad.titulo}</h5>
                                <h6>{actividad.date} | {actividad.tipoActividad}</h6>
                                <p className='Ttexto'>
                                    <strong>{actividad.arboles}</strong> árboles a plantar
                                </p>
                            </div>
                        </div>
                    </div>
                
                ))}
            </div>
        </div>
    );
    }