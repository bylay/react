import { Form, Button } from "react-bootstrap";
import { useState } from "react";

    interface PropsRefore {
        onSave: (actividad: Omit<Actividad, 'id'>) => void;
    }

    export default function FormReforestacion({onSave}: PropsRefore) {
        const [formData, setFormData] = useState({
            titulo: '',
            arboles: 0,
            tipoActividad: 'Urbana',
            fecha: ''
        })


        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const {name, value } = e.target;
            setFormData(prev => ({...prev, [name]: value }))
        };

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onSave(formData);
            setFormData({
                titulo: '',
                arboles: 0,
                tipoActividad: 'Urbana',
                fecha: ''
            })
            console.log('Datos del Formulario:', formData);
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
                    />
                </Form.Group>

                <Form.Group className="f2">
                    <Form.Label>Arboles a plantar</Form.Label>
                    <Form.Control
                        type="number"
                        name="arboles"
                        min="1"
                        value={formData.arboles}
                        onChange={handleChange}
                    />
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
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registrar
                </Button>
            </Form>
        );
    }

