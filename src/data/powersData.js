// Dados dos poderes do sistema Mutantes & Malfeitores

// Efeitos base dos poderes
export const BASE_EFFECTS = [
  {
    name: 'Affliction',
    description: 'Causa condições prejudiciais no alvo',
    baseCost: 1,
    type: 'attack',
    range: 'close',
    duration: 'instant',
    resistance: 'fortitude'
  },
  {
    name: 'Blast',
    description: 'Ataque de dano à distância',
    baseCost: 2,
    type: 'attack',
    range: 'ranged',
    duration: 'instant',
    resistance: 'toughness'
  },
  {
    name: 'Concealment',
    description: 'Torna o usuário difícil de detectar',
    baseCost: 2,
    type: 'general',
    range: 'personal',
    duration: 'sustained',
    resistance: 'none'
  },
  {
    name: 'Create',
    description: 'Cria objetos temporários',
    baseCost: 2,
    type: 'general',
    range: 'ranged',
    duration: 'sustained',
    resistance: 'none'
  },
  {
    name: 'Damage',
    description: 'Causa dano direto',
    baseCost: 2,
    type: 'attack',
    range: 'close',
    duration: 'instant',
    resistance: 'toughness'
  },
  {
    name: 'Enhanced Ability',
    description: 'Aumenta um atributo',
    baseCost: 2,
    type: 'general',
    range: 'personal',
    duration: 'permanent',
    resistance: 'none'
  },
  {
    name: 'Enhanced Defense',
    description: 'Aumenta uma defesa',
    baseCost: 1,
    type: 'defense',
    range: 'personal',
    duration: 'permanent',
    resistance: 'none'
  },
  {
    name: 'Flight',
    description: 'Capacidade de voar',
    baseCost: 2,
    type: 'movement',
    range: 'personal',
    duration: 'sustained',
    resistance: 'none'
  },
  {
    name: 'Healing',
    description: 'Cura ferimentos',
    baseCost: 2,
    type: 'general',
    range: 'close',
    duration: 'instant',
    resistance: 'none'
  },
  {
    name: 'Illusion',
    description: 'Cria ilusões sensoriais',
    baseCost: 1,
    type: 'general',
    range: 'perception',
    duration: 'sustained',
    resistance: 'will'
  },
  {
    name: 'Immunity',
    description: 'Imunidade a efeitos específicos',
    baseCost: 1,
    type: 'defense',
    range: 'personal',
    duration: 'permanent',
    resistance: 'none'
  },
  {
    name: 'Invisibility',
    description: 'Torna-se invisível',
    baseCost: 2,
    type: 'general',
    range: 'personal',
    duration: 'sustained',
    resistance: 'none'
  },
  {
    name: 'Mind Reading',
    description: 'Lê pensamentos',
    baseCost: 2,
    type: 'sensory',
    range: 'perception',
    duration: 'sustained',
    resistance: 'will'
  },
  {
    name: 'Move Object',
    description: 'Move objetos telecineticamente',
    baseCost: 2,
    type: 'general',
    range: 'ranged',
    duration: 'sustained',
    resistance: 'none'
  },
  {
    name: 'Protection',
    description: 'Resistência a dano',
    baseCost: 1,
    type: 'defense',
    range: 'personal',
    duration: 'permanent',
    resistance: 'none'
  },
  {
    name: 'Speed',
    description: 'Velocidade de movimento aumentada',
    baseCost: 1,
    type: 'movement',
    range: 'personal',
    duration: 'sustained',
    resistance: 'none'
  },
  {
    name: 'Teleport',
    description: 'Teletransporte',
    baseCost: 2,
    type: 'movement',
    range: 'personal',
    duration: 'instant',
    resistance: 'none'
  }
];

// Extras dos poderes
export const POWER_EXTRAS = [
  {
    name: 'Accurate',
    description: 'Bônus de +2 para acertar por graduação',
    costModifier: '+1',
    applicableTo: ['attack']
  },
  {
    name: 'Area',
    description: 'Afeta uma área',
    costModifier: '+1',
    applicableTo: ['attack', 'general']
  },
  {
    name: 'Extended Range',
    description: 'Alcance aumentado',
    costModifier: '+1',
    applicableTo: ['ranged']
  },
  {
    name: 'Multiattack',
    description: 'Múltiplos ataques',
    costModifier: '+1',
    applicableTo: ['attack']
  },
  {
    name: 'Penetrating',
    description: 'Ignora proteção',
    costModifier: '+1',
    applicableTo: ['damage']
  },
  {
    name: 'Precise',
    description: 'Controle muito preciso',
    costModifier: '+1',
    applicableTo: ['general']
  },
  {
    name: 'Selective',
    description: 'Pode escolher alvos em área',
    costModifier: '+1',
    applicableTo: ['area']
  },
  {
    name: 'Subtle',
    description: 'Difícil de detectar quando usado',
    costModifier: '+1',
    applicableTo: ['all']
  }
];

// Complicações dos poderes
export const POWER_FLAWS = [
  {
    name: 'Activation',
    description: 'Requer ação para ativar',
    costModifier: '-1',
    applicableTo: ['permanent']
  },
  {
    name: 'Check Required',
    description: 'Requer teste de perícia',
    costModifier: '-1',
    applicableTo: ['all']
  },
  {
    name: 'Close Range',
    description: 'Apenas alcance próximo',
    costModifier: '-1',
    applicableTo: ['ranged']
  },
  {
    name: 'Limited',
    description: 'Funciona apenas em situações específicas',
    costModifier: '-1',
    applicableTo: ['all']
  },
  {
    name: 'Noticeable',
    description: 'Óbvio quando ativo',
    costModifier: '-1',
    applicableTo: ['all']
  },
  {
    name: 'Quirk',
    description: 'Efeito colateral menor',
    costModifier: '-1',
    applicableTo: ['all']
  },
  {
    name: 'Removable',
    description: 'Pode ser removido facilmente',
    costModifier: '-1',
    applicableTo: ['device']
  },
  {
    name: 'Tiring',
    description: 'Causa fadiga ao usar',
    costModifier: '-1',
    applicableTo: ['all']
  }
];

// Ícones para poderes
export const POWER_ICONS = [
  '⚡', '🔥', '❄️', '💨', '🌊', '🌍', '🌟', '🌙', '☀️', '⭐',
  '💥', '⚔️', '🛡️', '👁️', '🧠', '💎', '🔮', '⚗️', '🧪', '🔬',
  '🎯', '🏹', '🌀', '💫', '🌈', '🔆', '💡', '🔋', '⚙️',
  '🎭', '👻', '🦅', '🐺', '🦁', '🐉', '🔱', '⚖️', '🎪', '🎨'
];

// Função para calcular custo do poder
export const calculatePowerCost = (power) => {
  if (!power.baseEffect || !power.rank) return 0;
  
  let baseCost = power.baseEffect.baseCost;
  let totalCost = baseCost * power.rank;
  
  // Aplicar extras
  power.extras?.forEach(extra => {
    const modifier = parseInt(extra.costModifier.replace(/[^-\d]/g, ''));
    totalCost += modifier * power.rank;
  });
  
  // Aplicar complicações
  power.flaws?.forEach(flaw => {
    const modifier = parseInt(flaw.costModifier.replace(/[^-\d]/g, ''));
    totalCost += modifier * power.rank;
  });
  
  return Math.max(0, totalCost);
};

// Estrutura inicial de um poder
export const createInitialPower = () => ({
  name: '',
  description: '',
  baseEffect: null,
  rank: 1,
  extras: [],
  flaws: [],
  icon: '⚡',
  notes: '',
  cost: 0
});
