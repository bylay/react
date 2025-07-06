import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

    export interface Actividad {
        id: string;
        titulo: string;
        arboles: number;
        tipoActividad: string;
        fecha: string;
    }

    interface PropsRefore {
        ActividadActual: Actividad | null;
        onSave: (actividad: Actividad | Omit<Actividad, 'id'>) => void
    }

    export default function FormReforestacion({ActividadActual, onSave}: PropsRefore) {
        const [errores, setErrores] = useState<Record<string, string>>({});
        const [formData, setFormData] = useState(
            ActividadActual || {
            titulo: '',
            arboles: 0,
            tipoActividad: 'Urbana',
            fecha: ''
        });

        useEffect(() => {
            if (ActividadActual) {
                setFormData(ActividadActual);
            } else {
                setFormData({
                    titulo: '',
                    arboles: 0,
                    tipoActividad: 'Urbana',
                    fecha: ''
                })
            }
        }, [ActividadActual])

        const getActualFecha = () => {
            const now = new Date();
            return now.toISOString().split('T')[0]
        }

        const validar = () => {
            const nuevosErrores: Record<string, string> = {};
            if (!formData.titulo.trim()) nuevosErrores.titulo = 'Nombre requerido';
            if (formData.arboles <= 0) nuevosErrores.arboles = 'Mínimo 1 árbol';
            if (!formData.fecha) nuevosErrores.fecha = 'Fecha requrida';
            if (formData.fecha < getActualFecha()) nuevosErrores.fecha = 'Fecha no puede ser pasada';
            return nuevosErrores
        }


        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const {name, value } = e.target;
            setFormData(prev => ({...prev, [name]: name === 'arboles' ? Number(value) : value }))
        };

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            const validarError = validar();
            if (Object.keys(validarError).length > 0) {
                setErrores(validarError);
                return;
            }
            onSave(formData);
            setFormData({
                titulo: '',
                arboles: 0,
                tipoActividad: 'Urbana',
                fecha: ''
            })
            setErrores({});
        };

        return (
            <Form onSubmit={handleSubmit}>
                <Form.Group className="f2">
                    <Form.Label>Nombre de la Jornada</Form.Label>
                    <Form.Control
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        placeholder="Ej: Reforestación Parque Roco"
                        isInvalid={!!errores.titulo}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.titulo}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="f2">
                    <Form.Label>Arboles a plantar</Form.Label>
                    <Form.Control
                        type="number"
                        name="arboles"
                        min="1"
                        value={formData.arboles}
                        onChange={handleChange}
                        isInvalid={!!errores.arboles}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.arboles}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="f2">
                    <Form.Label>Tipo de Zona</Form.Label>
                        <Form.Select
                            name="tipoActividad"
                            value={formData.tipoActividad}
                            onChange={handleChange}
                        >
                            <option value="Urbana">Zona Urbana</option>
                            <option value="Rural">Zona Rural</option>
                        </Form.Select>           
                </Form.Group>

                <Form.Group className="f2">
                    <Form.Label>Fecha de la Jornada</Form.Label>
                    <Form.Control
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        placeholder="Ej: Reforestación Parque Roco"
                        isInvalid={!!errores.fecha}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.fecha}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    {ActividadActual ? 'Editar' : 'Registrar'}
                </Button>

                {ActividadActual && (
                    <Button variant="secondary" onClick={() => onSave({
                        titulo: '',
                        arboles: 0,
                        tipoActividad: 'Urbana',
                        fecha: ''
                    })}>
                        Cancelar
                    </Button>
                )}
            </Form>
        );
    }

