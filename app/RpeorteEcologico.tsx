import { useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { addReporteEcologico } from '@/lib/services/firebaseService';

interface ReporteProps {
    actividadId: string;
}

export default function ReporteEcologico({ actividadId }: ReporteProps)
{
    const [foto, setFoto] = useState<string | null>(null);
    const [observaciones, setObservaciones] = useState('');

    const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFoto(reader.result as string)
            };
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async () => {
        if (foto && observaciones) {
            await addReporteEcologico(actividadId, {foto, observaciones});
            setFoto(null);
            setObservaciones('');
        }
    };

    return (
        <div>
            <h5>Reporte Ecológico</h5>
            {foto && <Image src={foto} thumbnail className='f1' />}

            <Form.Group>
                <Form.Label>Subir foto del estado actual</Form.Label>
                <Form.Control type='file' accept='iamge/*' onChange={handleFotoChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Observaciones</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                />
                <Button variant='succes' onClick={handleSubmit}>
                    Enviar Reporte
                </Button>
            </Form.Group>
        </div>
    )
}