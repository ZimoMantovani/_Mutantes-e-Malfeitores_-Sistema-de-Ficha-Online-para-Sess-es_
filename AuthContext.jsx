import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Registrar usuário
  const signup = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Atualizar perfil com nome
    if (displayName) {
      await updateProfile(user, { displayName });
    }
    
    // Criar documento do usuário no Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: displayName || '',
      createdAt: new Date(),
      characters: []
    });
    
    return userCredential;
  };

  // Login com email e senha
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login com Google
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Verificar se é um novo usuário
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      // Criar documento do usuário no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: new Date(),
        characters: []
      });
    }
    
    return userCredential;
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Reset de senha
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Salvar personagem do usuário
  const saveCharacter = async (character) => {
    if (!currentUser) throw new Error('Usuário não autenticado');
    
    const characterData = {
      ...character,
      userId: currentUser.uid,
      updatedAt: new Date()
    };
    
    // Se o personagem não tem ID, criar um novo
    if (!character.id) {
      characterData.id = Date.now().toString();
      characterData.createdAt = new Date();
    }
    
    await setDoc(doc(db, 'characters', characterData.id), characterData);
    return characterData;
  };

  // Carregar personagens do usuário
  const loadUserCharacters = async () => {
    if (!currentUser) return [];
    
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        return userDoc.data().characters || [];
      }
      return [];
    } catch (error) {
      console.error('Erro ao carregar personagens:', error);
      return [];
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    saveCharacter,
    loadUserCharacters
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
