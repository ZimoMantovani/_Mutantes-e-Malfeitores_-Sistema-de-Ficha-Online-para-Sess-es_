import { useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useFirebaseSync = (character, dispatch, actions) => {
  const { currentUser, saveCharacter, loadUserCharacters } = useAuth();

  // Salvar personagem no Firebase (com debounce)
  const saveToFirebase = useCallback(async () => {
    if (!currentUser || !character.nome) return;
    
    try {
      await saveCharacter(character);
      console.log('Personagem salvo no Firebase');
    } catch (error) {
      console.error('Erro ao salvar no Firebase:', error);
    }
  }, [currentUser, character, saveCharacter]);

  // Carregar personagens do Firebase
  const loadFromFirebase = useCallback(async () => {
    if (!currentUser) return;
    
    try {
      const characters = await loadUserCharacters();
      if (characters.length > 0) {
        // Carregar o último personagem editado
        const lastCharacter = characters.sort((a, b) => 
          new Date(b.updatedAt) - new Date(a.updatedAt)
        )[0];
        
        dispatch({
          type: actions.LOAD_CHARACTER,
          payload: lastCharacter
        });
      }
    } catch (error) {
      console.error('Erro ao carregar do Firebase:', error);
    }
  }, [currentUser, loadUserCharacters, dispatch, actions]);

  // Auto-save com debounce
  useEffect(() => {
    if (!currentUser || !character.nome) return;
    
    const timeoutId = setTimeout(saveToFirebase, 2000);
    return () => clearTimeout(timeoutId);
  }, [character, saveToFirebase, currentUser]);

  // Carregar ao fazer login
  useEffect(() => {
    if (currentUser) {
      loadFromFirebase();
    }
  }, [currentUser, loadFromFirebase]);

  return {
    saveToFirebase,
    loadFromFirebase,
    isLoggedIn: !!currentUser
  };
};
