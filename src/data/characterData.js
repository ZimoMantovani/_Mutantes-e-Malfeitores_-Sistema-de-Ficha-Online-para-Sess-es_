// Dados base do sistema Mutantes & Malfeitores

export const DEFAULT_POWER_LEVEL = 10;

// Função para calcular pontos totais baseado no nível de poder
export const calculateTotalPoints = (powerLevel) => {
  return powerLevel * 15; // 15 pontos por nível de poder
};

// Atributos principais
export const ATTRIBUTES = [
  { key: 'forca', name: 'Força', abbreviation: 'FOR' },
  { key: 'agilidade', name: 'Agilidade', abbreviation: 'AGI' },
  { key: 'luta', name: 'Luta', abbreviation: 'LUT' },
  { key: 'prontidao', name: 'Prontidão', abbreviation: 'PRO' },
  { key: 'vigor', name: 'Vigor', abbreviation: 'VIG' },
  { key: 'destreza', name: 'Destreza', abbreviation: 'DES' },
  { key: 'intelecto', name: 'Intelecto', abbreviation: 'INT' },
  { key: 'presenca', name: 'Presença', abbreviation: 'PRE' }
];

// Defesas
export const DEFENSES = [
  { 
    key: 'esquiva', 
    name: 'Esquiva', 
    baseAttribute: 'agilidade',
    abbreviation: 'ESQ'
  },
  { 
    key: 'aparar', 
    name: 'Aparar', 
    baseAttribute: 'luta',
    abbreviation: 'APA'
  },
  { 
    key: 'fortitude', 
    name: 'Fortitude', 
    baseAttribute: 'vigor',
    abbreviation: 'FOR'
  },
  { 
    key: 'resistencia', 
    name: 'Resistência', 
    baseAttribute: 'vigor',
    abbreviation: 'RES'
  },
  { 
    key: 'vontade', 
    name: 'Vontade', 
    baseAttribute: 'presenca',
    abbreviation: 'VON'
  }
];

// Perícias do sistema
export const SKILLS = [
  { key: 'acrobacia', name: 'Acrobacia', baseAttribute: 'agilidade' },
  { key: 'atletismo', name: 'Atletismo', baseAttribute: 'forca' },
  { key: 'combate_corpo_a_corpo', name: 'Combate Corpo-a-Corpo', baseAttribute: 'luta' },
  { key: 'combate_a_distancia', name: 'Combate a Distância', baseAttribute: 'destreza' },
  { key: 'enganacao', name: 'Enganação', baseAttribute: 'presenca' },
  { key: 'especialidade_1', name: 'Especialidade', baseAttribute: 'intelecto' },
  { key: 'especialidade_2', name: 'Especialidade', baseAttribute: 'intelecto' },
  { key: 'especialidade_3', name: 'Especialidade', baseAttribute: 'intelecto' },
  { key: 'especialidade_4', name: 'Especialidade', baseAttribute: 'intelecto' },
  { key: 'furtividade', name: 'Furtividade', baseAttribute: 'agilidade' },
  { key: 'intimidacao', name: 'Intimidação', baseAttribute: 'presenca' },
  { key: 'intuicao', name: 'Intuição', baseAttribute: 'prontidao' },
  { key: 'investigacao', name: 'Investigação', baseAttribute: 'intelecto' },
  { key: 'percepcao', name: 'Percepção', baseAttribute: 'prontidao' },
  { key: 'persuasao', name: 'Persuasão', baseAttribute: 'presenca' },
  { key: 'prestidigitacao', name: 'Prestidigitação', baseAttribute: 'destreza' },
  { key: 'tecnologia', name: 'Tecnologia', baseAttribute: 'intelecto' },
  { key: 'tratamento', name: 'Tratamento', baseAttribute: 'intelecto' },
  { key: 'veiculos', name: 'Veículos', baseAttribute: 'destreza' }
];

// Vantagens comuns
export const COMMON_ADVANTAGES = [
  'Ataque Poderoso',
  'Defesa Aprimorada',
  'Esquiva Aprimorada',
  'Sorte',
  'Inspiração',
  'Liderança',
  'Conexões',
  'Benefício',
  'Equipamento',
  'Inventor',
  'Ritual',
  'Artificer',
  'Eidetic Memory',
  'Jack-of-all-trades',
  'Beginner\'s Luck',
  'Teamwork',
  'Taunt',
  'Set-up',
  'Improved Initiative',
  'Improved Critical',
  'Power Attack',
  'All-out Attack',
  'Defensive Attack',
  'Move-by Action',
  'Redirect',
  'Interpose',
  'Evasion',
  'Uncanny Dodge',
  'Hide in Plain Sight',
  'Instant Up',
  'Improved Grab',
  'Improved Hold',
  'Improved Pin',
  'Improved Disarm',
  'Improved Trip',
  'Chokehold',
  'Fast Grab',
  'Prone Fighting',
  'Takedown'
];

// Complicações comuns
export const COMMON_COMPLICATIONS = [
  'Inimigo',
  'Identidade Secreta',
  'Responsabilidade',
  'Relacionamento',
  'Reputação',
  'Rivalidade',
  'Obsessão',
  'Fobia',
  'Deficiência',
  'Dependência',
  'Honra',
  'Motivação',
  'Preconceito',
  'Poder Incontrolável',
  'Fraqueza',
  'Vulnerabilidade',
  'Susceptibilidade',
  'Temper',
  'Compulsão',
  'Addiction'
];

// Estrutura inicial do personagem
export const createInitialCharacter = () => ({
  // Informações básicas
  heroi: '',
  jogador: '',
  identidade: '',
  identidadeSecreta: true,
  genero: '',
  idade: '',
  altura: '',
  peso: '',
  olhos: '',
  cabelos: '',
  grupoAfiliado: '',
  baseOperacoes: '',
  nivelPoder: DEFAULT_POWER_LEVEL,
  
  // Imagem do personagem
  imagemPersonagem: null,
  
  // Pontos
  pontosHeroicos: 1,
  pontosPoderGanhos: 0,
  pontosPoderExtras: 0,
  
  // Atributos (valor de 0 a 20, custo 2 pontos por nível)
  atributos: {
    forca: 0,
    agilidade: 0,
    luta: 0,
    prontidao: 0,
    vigor: 0,
    destreza: 0,
    intelecto: 0,
    presenca: 0
  },
  
  // Defesas (valor base + modificações)
  defesas: {
    esquiva: 0, // Será 10 + agilidade + este valor
    aparar: 0,  // Será 10 + luta + este valor
    fortitude: 0, // Será 10 + vigor + este valor
    resistencia: 0, // Será 10 + vigor + este valor
    vontade: 0  // Será 10 + presença + este valor
  },
  
  // Perícias (graduação de 0 a 20, custo 1 ponto por 2 graduações)
  pericias: {},
  
  // Vantagens (custo variável)
  vantagens: [],
  
  // Complicações (geram pontos)
  complicacoes: [],
  
  // Poderes
  poderes: [],
  
  // Equipamentos
  equipamentos: '',
  
  // Notas e condições
  notas: '',
  
  // Desenho/descrição
  desenho: '',
  
  // Informações de campanha
  serie: '',
  mestre: '',
  informacoes: ''
});

// Funções de cálculo
// No sistema M&M, os atributos são valores diretos, não há modificadores como no D&D

export const calculateDefenseValue = (character, defenseKey) => {
  const defense = DEFENSES.find(d => d.key === defenseKey);
  if (!defense) return 0;
  
  const baseAttributeValue = character.atributos[defense.baseAttribute] || 0;
  const defenseBonus = character.defesas[defenseKey] || 0;
  
  return 10 + baseAttributeValue + defenseBonus;
};

// Função para calcular limite máximo de defesa (NP x 2)
export const getDefenseLimit = (powerLevel) => {
  return (powerLevel * 2) + 10;
};

export const calculateSkillTotal = (character, skillKey) => {
  const skill = SKILLS.find(s => s.key === skillKey);
  if (!skill) return 0;
  
  const baseAttributeValue = character.atributos[skill.baseAttribute] || 0;
  const skillRanks = character.pericias[skillKey] || 0;
  
  return baseAttributeValue + skillRanks;
};

// Função para calcular limite máximo de perícia (NP x 2)
export const getSkillLimit = (powerLevel) => {
  return powerLevel * 2;
};

export const calculatePointsSpent = (character) => {
  // Atributos: 2 pontos por nível
  const attributePoints = Object.values(character.atributos).reduce((sum, value) => sum + (value * 2), 0);
  
  // Defesas: 1 ponto por nível
  const defensePoints = Object.values(character.defesas).reduce((sum, value) => sum + value, 0);
  
  // Perícias: 1 ponto por 2 graduações (arredondado para cima)
  const skillPoints = Object.values(character.pericias).reduce((sum, ranks) => sum + Math.ceil(ranks / 2), 0);
  
  // Vantagens: custo variável (assumindo 1 ponto cada por simplicidade)
  const advantagePoints = character.vantagens.length;
  
  // Poderes: custo variável
  const powerPoints = character.poderes.reduce((sum, power) => sum + (power.custo || 0), 0);
  
  return {
    atributos: attributePoints,
    defesas: defensePoints,
    pericias: skillPoints,
    vantagens: advantagePoints,
    poderes: powerPoints,
    total: attributePoints + defensePoints + skillPoints + advantagePoints + powerPoints
  };
};

export const getTotalPoints = (character) => {
  const basePoints = calculateTotalPoints(character.nivelPoder || DEFAULT_POWER_LEVEL);
  return basePoints + (character.pontosPoderExtras || 0);
};

export const getRemainingPoints = (character) => {
  const spent = calculatePointsSpent(character);
  const total = getTotalPoints(character);
  return total - spent.total;
};
