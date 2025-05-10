// Config/firebaseConfig.js
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey:       "AIzaSyD3kIjHbvwSfau5DzfcRPVsThkezNbbk4w",
  authDomain:   "fir-auth-aa315.firebaseapp.com",
  projectId:    "fir-auth-aa315",
  storageBucket:"fir-auth-aa315.appspot.com",
  messagingSenderId:"623676313958",
  appId:        "1:623676313958:web:2eecd97c6bd2dcf98878a7"
};

// Khởi tạo app (chỉ một lần)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// DÙNG Web SDK Auth cho Expo Go
const auth = getAuth(app);

export { auth };

