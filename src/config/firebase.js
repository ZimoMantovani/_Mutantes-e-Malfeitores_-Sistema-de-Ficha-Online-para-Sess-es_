// Configuração do Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase (substitua pelos seus valores)
const firebaseConfig = {
  apiKey: "AIzaSyBj1lf6aT0P1xSjE5EJfdu08zYhBzzkLRk",
  authDomain: "fichas-de-personagem-mm.firebaseapp.com",
  projectId: "fichas-de-personagem-mm",
  storageBucket: "fichas-de-personagem-mm.firebasestorage.app",
  messagingSenderId: "50442291191",
  appId: "1:50442291191:web:803949e8bb9cacabe910f2",
  measurementId: "G-CG9CKH8LWK"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
