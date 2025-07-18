import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore'
import { Actividad } from '@/app/FormReforestacion'
import { auth } from '@/lib/firebase';

export const getActividades = async (userId?: string): Promise<Actividad[]> => {
    let q = query(collection(db, "actividades"));

    if(userId) {
        q = query(q, where("participantes", "array-contains", userId));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()} as Actividad));
};

export const addActividad = async (actividad: Omit<Actividad, 'id'>): Promise<string> => {
    if (!auth.currentUser) throw new Error("Usuario no autenticado");
  
    const docRef = await addDoc(collection(db, "actividades"), {
        ...actividad,
        userId: auth.currentUser.uid
  });
    
    return docRef.id;
}

export const updateActividad = async (id: string, actividad: Partial<Actividad>) => {
    await updateDoc(doc(db, "actividades", id), actividad);
    if (!auth.currentUser) throw new Error("Usuario no autenticado");
}

export const deleteActividad = async (id: string) => {
    await deleteDoc(doc(db, "actividad", id));
    if (!auth.currentUser) throw new Error("Usuario no autenticado");
}

export const addReporteEcologico = async (actividadId: string, reporte: {foto: string, observaciones: string}) => {
    await addDoc(collection(db, "reportes"), {
        ...reporte,
        actividadId,
        fecha: new Date().toISOString()
    });
}