import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, doc } from 'firebase/firestore';
import { Form, Button } from 'react-bootstrap';

interface Comentario {
    id: string;
    texto: string;
    usuario: string;
    fecha: Date;
}

interface ComentarioProps {
    actividadId: string;
}

export default function ComentariosActividad ( { actividadId }: ComentarioProps) {
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [nuevoComentario, setNuevoComentario] = useState('');

    useEffect(() => {
        const q = query(
            collection(db, "actividades", actividadId, "comentarios"),
            orderBy("fecha", "desc")
        );

        const unsuscribe = onSnapshot(q, (snapshot) => {
            const comentarioData: Comentario[] = [];
            snapshot.forEach(doc => {
                comentarioData.push( { id: doc.id, ...doc.data() } as Comentario)
            });
            setComentarios(comentarioData)
        });
        return () => unsuscribe();
    },   [actividadId]);

        const enviarComentario = async () => {
            if (nuevoComentario.trim()) {
                await addDoc(collection(db, "actividades", actividadId, "comentarios"), {
                    texto: nuevoComentario,
                    usuario: "Usuario Actual",
                    fecha: new Date()                   
                });
                setNuevoComentario('');
            }
        };
        return (
            <div>
                <h5>Comentarios de participantes</h5>
                <div>
                    {comentarios.map(comentario => (
                        <div key={comentario.id}>
                            <strong>{comentario.usuario}</strong>
                            <p>{comentario.texto}</p>
                            <small>{new Date(comentario.fecha).toLocaleDateString()}</small>
                        </div>
                    ))}
                </div>
                <Form.Control
                    as="textarea"
                    rows={2}
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                    placeholder="Escribe un comentario..."
                />
                <Button variant="primary" onClick={enviarComentario}>
                    Enviar comentario
                </Button>
            </div>
        )
    }
