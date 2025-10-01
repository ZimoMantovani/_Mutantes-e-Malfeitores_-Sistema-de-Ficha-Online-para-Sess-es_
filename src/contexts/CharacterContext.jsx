import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { createInitialCharacter } from '../data/characterData';

const CharacterContext = createContext();

// Actions para o reducer
const CHARACTER_ACTIONS = {
  LOAD_CHARACTER: 'LOAD_CHARACTER',
  UPDATE_BASIC_INFO: 'UPDATE_BASIC_INFO',
  UPDATE_ATTRIBUTE: 'UPDATE_ATTRIBUTE',
  UPDATE_DEFENSE: 'UPDATE_DEFENSE',
  UPDATE_SKILL: 'UPDATE_SKILL',
  ADD_ADVANTAGE: 'ADD_ADVANTAGE',
  REMOVE_ADVANTAGE: 'REMOVE_ADVANTAGE',
  ADD_COMPLICATION: 'ADD_COMPLICATION',
  REMOVE_COMPLICATION: 'REMOVE_COMPLICATION',
  ADD_POWER: 'ADD_POWER',
  UPDATE_POWER: 'UPDATE_POWER',
  REMOVE_POWER: 'REMOVE_POWER',
  UPDATE_EQUIPMENT: 'UPDATE_EQUIPMENT',
  UPDATE_NOTES: 'UPDATE_NOTES',
  ADD_EXTRA_POINTS: 'ADD_EXTRA_POINTS',
  REMOVE_EXTRA_POINTS: 'REMOVE_EXTRA_POINTS',
  UPDATE_POWER_LEVEL: 'UPDATE_POWER_LEVEL',
  SET_CHARACTER_IMAGE: 'SET_CHARACTER_IMAGE',
  RESET_CHARACTER: 'RESET_CHARACTER'
};

// Reducer para gerenciar o estado do personagem
const characterReducer = (state, action) => {
  switch (action.type) {
    case CHARACTER_ACTIONS.LOAD_CHARACTER:
      return { ...action.payload };
      
    case CHARACTER_ACTIONS.UPDATE_BASIC_INFO:
      return { ...state, ...action.payload };
      
    case CHARACTER_ACTIONS.UPDATE_ATTRIBUTE:
      return {
        ...state,
        atributos: {
          ...state.atributos,
          [action.payload.attribute]: action.payload.value
        }
      };
      
    case CHARACTER_ACTIONS.UPDATE_DEFENSE:
      return {
        ...state,
        defesas: {
          ...state.defesas,
          [action.payload.defense]: action.payload.value
        }
      };
      
    case CHARACTER_ACTIONS.UPDATE_SKILL:
      return {
        ...state,
        pericias: {
          ...state.pericias,
          [action.payload.skill]: action.payload.value
        }
      };
      
    case CHARACTER_ACTIONS.ADD_ADVANTAGE:
      return {
        ...state,
        vantagens: [...state.vantagens, action.payload]
      };
      
    case CHARACTER_ACTIONS.REMOVE_ADVANTAGE:
      return {
        ...state,
        vantagens: state.vantagens.filter((_, index) => index !== action.payload.index)
      };
      
    case CHARACTER_ACTIONS.ADD_COMPLICATION:
      return {
        ...state,
        complicacoes: [...state.complicacoes, action.payload]
      };
      
    case CHARACTER_ACTIONS.REMOVE_COMPLICATION:
      return {
        ...state,
        complicacoes: state.complicacoes.filter((_, index) => index !== action.payload.index)
      };
      
    case CHARACTER_ACTIONS.ADD_POWER:
      return {
        ...state,
        poderes: [...state.poderes, action.payload]
      };
      
    case CHARACTER_ACTIONS.UPDATE_POWER:
      return {
        ...state,
        poderes: state.poderes.map((power, index) => 
          index === action.payload.index ? { ...power, ...action.payload.updates } : power
        )
      };
      
    case CHARACTER_ACTIONS.REMOVE_POWER:
      return {
        ...state,
        poderes: state.poderes.filter((_, index) => index !== action.payload.index)
      };
      
    case CHARACTER_ACTIONS.UPDATE_EQUIPMENT:
      return { ...state, equipamentos: action.payload };
      
    case CHARACTER_ACTIONS.UPDATE_NOTES:
      return { ...state, notas: action.payload };
      
    case CHARACTER_ACTIONS.ADD_EXTRA_POINTS:
      return {
        ...state,
        pontosPoderExtras: (state.pontosPoderExtras || 0) + action.payload
      };
      
    case CHARACTER_ACTIONS.REMOVE_EXTRA_POINTS:
      return {
        ...state,
        pontosPoderExtras: Math.max(0, (state.pontosPoderExtras || 0) - action.payload)
      };
      
    case CHARACTER_ACTIONS.UPDATE_POWER_LEVEL:
      return {
        ...state,
        nivelPoder: action.payload
      };
      
    case CHARACTER_ACTIONS.SET_CHARACTER_IMAGE:
      return { ...state, imagemPersonagem: action.payload };
      
    case CHARACTER_ACTIONS.RESET_CHARACTER:
      return createInitialCharacter();
      
    default:
      return state;
  }
};

// Provider do contexto
export const CharacterProvider = ({ children }) => {
  const [character, dispatch] = useReducer(characterReducer, createInitialCharacter());
  
  // Integração com Firebase (importação dinâmica para evitar erros)
  useEffect(() => {
    const setupFirebaseSync = async () => {
      try {
        const { useFirebaseSync } = await import('../hooks/useFirebaseSync');
        useFirebaseSync(character, dispatch, CHARACTER_ACTIONS);
      } catch (error) {
        console.log('Firebase sync não disponível');
      }
    };
    
    setupFirebaseSync();
  }, [character]);

  // Salvar no localStorage sempre que o personagem mudar
  useEffect(() => {
    localStorage.setItem('mutantes-character', JSON.stringify(character));
  }, [character]);

  // Carregar do localStorage na inicialização
  useEffect(() => {
    const savedCharacter = localStorage.getItem('mutantes-character');
    if (savedCharacter) {
      try {
        const parsed = JSON.parse(savedCharacter);
        dispatch({ type: CHARACTER_ACTIONS.LOAD_CHARACTER, payload: parsed });
      } catch (error) {
        console.error('Erro ao carregar personagem salvo:', error);
      }
    }
  }, []);

  const value = {
    character,
    dispatch,
    actions: CHARACTER_ACTIONS
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};

// Hook para usar o contexto
export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter deve ser usado dentro de um CharacterProvider');
  }
  return context;
};

export default CharacterContext;
