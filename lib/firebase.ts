// lib/firebase.ts
import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    updateDoc
} from 'firebase/firestore';

// Lấy config từ expo-constants (app.json / eas.json)
const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.FIREBASE_API_KEY,
  authDomain: Constants.manifest?.extra?.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.manifest?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: Constants.manifest?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.manifest?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.manifest?.extra?.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export type Service = { id: string; name: string; price: number; };

export async function getServices(): Promise<Service[]> {
  const snap = await getDocs(collection(db, 'services'));
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Service, 'id'>) }));
}

export async function getService(id: string): Promise<Service | null> {
  const ref = doc(db, 'services', id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...(snap.data() as Omit<Service, 'id'>) } : null;
}

export async function addService(data: Omit<Service, 'id'>) {
  await addDoc(collection(db, 'services'), data);
}

export async function updateService(id: string, data: Partial<Omit<Service, 'id'>>) {
  await updateDoc(doc(db, 'services', id), data);
}

export async function deleteService(id: string) {
  await deleteDoc(doc(db, 'services', id));
}
