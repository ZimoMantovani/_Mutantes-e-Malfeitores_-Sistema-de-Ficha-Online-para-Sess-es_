import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Minus, BookOpen, Trash2 } from 'lucide-react';
import { useCharacter } from '../contexts/CharacterContext';
import { SKILLS, calculateSkillTotal, getRemainingPoints } from '../data/characterData';
import InfoTooltip, { InfoIcon } from './InfoTooltip';

const SkillsSection = () => {
  const { character, dispatch, actions } = useCharacter();
  const remainingPoints = getRemainingPoints(character);
  const [customSkillName, setCustomSkillName] = useState('');
  const [customSkillAttribute, setCustomSkillAttribute] = useState('intelecto');

  const updateSkill = (skill, newValue) => {
    const clampedValue = Math.max(0, Math.min(20, newValue));
    dispatch({
      type: actions.UPDATE_SKILL,
      payload: { skill, value: clampedValue }
    });
  };

  const canIncrease = (skill) => {
    const currentRanks = character.pericias[skill] || 0;
    const currentCost = Math.ceil(currentRanks / 2);
    const newCost = Math.ceil((currentRanks + 1) / 2);
    const additionalCost = newCost - currentCost;
    
    return currentRanks < 20 && remainingPoints >= additionalCost;
  };

  const canDecrease = (skill) => {
    const currentRanks = character.pericias[skill] || 0;
    return currentRanks > 0;
  };

  const getSkillCost = (ranks) => {
    return Math.ceil(ranks / 2);
  };

  const addCustomSkill = () => {
    if (!customSkillName.trim()) return;
    
    const customSkillKey = `custom_${Date.now()}`;
    const customSkill = {
      key: customSkillKey,
      name: customSkillName,
      baseAttribute: customSkillAttribute,
      isCustom: true
    };
    
    // Adicionar à lista de perícias (temporariamente)
    SKILLS.push(customSkill);
    
    setCustomSkillName('');
    setCustomSkillAttribute('intelecto');
  };

  const removeCustomSkill = (skillKey) => {
    // Remover da lista de perícias
    const index = SKILLS.findIndex(s => s.key === skillKey);
    if (index > -1) {
      SKILLS.splice(index, 1);
    }
    
    // Remover do personagem
    const newSkills = { ...character.pericias };
    delete newSkills[skillKey];
    
    dispatch({
      type: actions.UPDATE_SKILL,
      payload: { skill: skillKey, value: 0 }
    });
  };

  const getSkillDescription = (skill) => {
    const descriptions = {
      'acrobacia': 'Movimentos acrobáticos, equilíbrio e agilidade física.',
      'atletismo': 'Corrida, salto, natação e outras atividades físicas.',
      'combate_corpo_a_corpo': 'Luta desarmada e com armas brancas.',
      'combate_a_distancia': 'Uso de armas à distância e projéteis.',
      'enganacao': 'Mentir, blefar e enganar outros.',
      'furtividade': 'Mover-se silenciosamente e permanecer oculto.',
      'intimidacao': 'Assustar e coagir através de ameaças.',
      'intuicao': 'Perceber mentiras e intenções ocultas.',
      'investigacao': 'Buscar pistas e resolver mistérios.',
      'percepcao': 'Notar detalhes e estar alerta ao ambiente.',
      'persuasao': 'Convencer e influenciar outros positivamente.',
      'prestidigitacao': 'Truques de mão e manipulação de objetos pequenos.',
      'tecnologia': 'Usar e entender equipamentos tecnológicos.',
      'tratamento': 'Primeiros socorros e cuidados médicos.',
      'veiculos': 'Pilotar e operar diversos tipos de veículos.'
    };
    
    return descriptions[skill.key] || `Perícia especializada: ${skill.name}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-green-600" />
        <h2 className="text-xl font-bold text-gray-800">Perícias</h2>
        <InfoIcon content="Perícias custam 1 ponto para cada 2 graduações (arredondado para cima). O total é atributo base + graduações. Máximo de 20 graduações por perícia." />
      </div>

      {/* Adicionar perícia customizada */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">Adicionar Perícia Personalizada</h3>
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Nome da perícia"
            value={customSkillName}
            onChange={(e) => setCustomSkillName(e.target.value)}
            className="flex-1 min-w-[200px]"
          />
          <Select value={customSkillAttribute} onValueChange={setCustomSkillAttribute}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="forca">Força</SelectItem>
              <SelectItem value="agilidade">Agilidade</SelectItem>
              <SelectItem value="luta">Luta</SelectItem>
              <SelectItem value="prontidao">Prontidão</SelectItem>
              <SelectItem value="vigor">Vigor</SelectItem>
              <SelectItem value="destreza">Destreza</SelectItem>
              <SelectItem value="intelecto">Intelecto</SelectItem>
              <SelectItem value="presenca">Presença</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={addCustomSkill} disabled={!customSkillName.trim()}>
            <Plus className="w-4 h-4 mr-1" />
            Adicionar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SKILLS.map((skill) => {
          const ranks = character.pericias[skill.key] || 0;
          const total = calculateSkillTotal(character, skill.key);
          const baseAttributeValue = character.atributos[skill.baseAttribute] || 0;
          const cost = getSkillCost(ranks);

          return (
            <div key={skill.key} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <InfoTooltip 
                    content={getSkillDescription(skill)}
                    className="block"
                  >
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {skill.name}
                    </h3>
                  </InfoTooltip>
                  <div className="text-xs text-gray-500 mt-1">
                    Base: {skill.baseAttribute.charAt(0).toUpperCase() + skill.baseAttribute.slice(1)}
                  </div>
                </div>
                
                {skill.isCustom && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCustomSkill(skill.key)}
                    className="w-6 h-6 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>

              {/* Valor total da perícia */}
              <div className="text-center mb-3">
                <div className="text-2xl font-bold text-green-600 bg-green-50 rounded-lg py-2">
                  +{total}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {baseAttributeValue} + {ranks}
                </div>
              </div>

              {/* Controles para graduações */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateSkill(skill.key, ranks - 1)}
                  disabled={!canDecrease(skill.key)}
                  className="w-8 h-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <div className="text-center min-w-[60px]">
                  <div className="text-lg font-semibold text-gray-800">
                    {ranks}
                  </div>
                  <div className="text-xs text-gray-500">
                    grad.
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateSkill(skill.key, ranks + 1)}
                  disabled={!canIncrease(skill.key)}
                  className="w-8 h-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-center">
                <div className="text-xs text-gray-500">
                  Custo: {cost} pontos
                </div>
                {ranks === 20 && (
                  <div className="text-xs text-amber-600 font-medium mt-1">
                    Máximo atingido
                  </div>
                )}
              </div>

              {/* Input direto para graduações específicas */}
              <div className="mt-3">
                <Input
                  type="number"
                  min="0"
                  max="20"
                  value={ranks}
                  onChange={(e) => updateSkill(skill.key, parseInt(e.target.value) || 0)}
                  className="text-center text-sm h-8"
                  placeholder="0"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Informações sobre o sistema de perícias */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Sistema de Perícias</h4>
        <div className="text-blue-700 text-sm space-y-1">
          <p>• <strong>Graduações:</strong> Cada 2 graduações custam 1 ponto (arredondado para cima)</p>
          <p>• <strong>Teste:</strong> Role 1d20 + valor total da perícia</p>
          <p>• <strong>Especialidades:</strong> Podem ser personalizadas para áreas específicas de conhecimento</p>
        </div>
      </div>

      {remainingPoints < 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-800 text-sm font-medium">
            ❌ Você excedeu o limite de pontos! Reduza algumas graduações de perícia.
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
