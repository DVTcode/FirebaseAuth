// Config/firebaseConfig.js
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD3kIjHbvwSfau5DzfcRPVsThkezNbbk4w",
  authDomain: "fir-auth-aa315.firebaseapp.com",
  projectId: "fir-auth-aa315",
  storageBucket: "fir-auth-aa315.appspot.com",
  messagingSenderId: "623676313958",
  appId: "1:623676313958:web:2eecd97c6bd2dcf98878a7"
};

// Khởi tạo Firebase app 1 lần duy nhất
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firebase Auth & Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
