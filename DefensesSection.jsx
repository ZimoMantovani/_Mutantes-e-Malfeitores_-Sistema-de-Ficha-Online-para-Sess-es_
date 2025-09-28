import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Shield } from 'lucide-react';
import { useCharacter } from '../contexts/CharacterContext';
import { DEFENSES, calculateDefenseValue, getRemainingPoints } from '../data/characterData';
import InfoTooltip, { InfoIcon } from './InfoTooltip';

const DefensesSection = () => {
  const { character, dispatch, actions } = useCharacter();
  const remainingPoints = getRemainingPoints(character);

  const updateDefense = (defense, newValue) => {
    const clampedValue = Math.max(0, Math.min(20, newValue));
    dispatch({
      type: actions.UPDATE_DEFENSE,
      payload: { defense, value: clampedValue }
    });
  };

  const canIncrease = (defense) => {
    const currentValue = character.defesas[defense] || 0;
    return currentValue < 20 && remainingPoints >= 1;
  };

  const canDecrease = (defense) => {
    const currentValue = character.defesas[defense] || 0;
    return currentValue > 0;
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">Defesas</h2>
        <InfoIcon content="Defesas custam 1 ponto por nível de bônus. O valor total é 10 + atributo base + bônus comprado. Use estas defesas para resistir a ataques e efeitos." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {DEFENSES.map((def) => {
          const bonus = character.defesas[def.key] || 0;
          const totalValue = calculateDefenseValue(character, def.key);
          const baseAttributeValue = character.atributos[def.baseAttribute] || 0;
          const cost = bonus;

          const getDefenseDescription = (defenseKey) => {
            switch (defenseKey) {
              case 'esquiva':
                return 'Usada para evitar ataques físicos e à distância. Base: 10 + Agilidade + bônus.';
              case 'aparar':
                return 'Usada para bloquear ataques corpo a corpo. Base: 10 + Luta + bônus.';
              case 'fortitude':
                return 'Resistência a doenças, venenos e efeitos físicos. Base: 10 + Vigor + bônus.';
              case 'resistencia':
                return 'Resistência a dano físico. Base: 10 + Vigor + bônus.';
              case 'vontade':
                return 'Resistência a efeitos mentais e sobrenaturais. Base: 10 + Presença + bônus.';
              default:
                return 'Defesa do personagem.';
            }
          };

          return (
            <div key={def.key} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="text-center mb-3">
                <InfoTooltip 
                  content={getDefenseDescription(def.key)}
                  className="block"
                >
                  <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                    {def.name}
                  </h3>
                </InfoTooltip>
                <div className="text-xs text-gray-500 mt-1">
                  ({def.abbreviation})
                </div>
              </div>

              {/* Valor total da defesa */}
              <div className="text-center mb-3">
                <div className="text-3xl font-bold text-blue-600 bg-blue-50 rounded-lg py-2">
                  {totalValue}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  10 + {baseAttributeValue} + {bonus}
                </div>
              </div>

              {/* Controles para o bônus */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateDefense(def.key, bonus - 1)}
                  disabled={!canDecrease(def.key)}
                  className="w-8 h-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <div className="text-center min-w-[60px]">
                  <div className="text-lg font-semibold text-gray-800">
                    +{bonus}
                  </div>
                  <div className="text-xs text-gray-500">
                    bônus
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateDefense(def.key, bonus + 1)}
                  disabled={!canIncrease(def.key)}
                  className="w-8 h-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-center">
                <div className="text-xs text-gray-500">
                  Custo: {cost} pontos
                </div>
                {bonus === 20 && (
                  <div className="text-xs text-amber-600 font-medium mt-1">
                    Máximo atingido
                  </div>
                )}
              </div>

              {/* Input direto para bônus específicos */}
              <div className="mt-3">
                <Input
                  type="number"
                  min="0"
                  max="20"
                  value={bonus}
                  onChange={(e) => updateDefense(def.key, parseInt(e.target.value) || 0)}
                  className="text-center text-sm h-8"
                  placeholder="0"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Informações adicionais */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Defesas Ativas</h4>
          <p className="text-blue-700">
            <strong>Esquiva</strong> e <strong>Aparar</strong> são usadas contra ataques diretos. 
            Você pode escolher qual usar contra cada ataque.
          </p>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">Defesas de Resistência</h4>
          <p className="text-green-700">
            <strong>Fortitude</strong>, <strong>Resistência</strong> e <strong>Vontade</strong> são 
            usadas para resistir a efeitos após serem atingidos.
          </p>
        </div>
      </div>

      {remainingPoints < 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-800 text-sm font-medium">
            ❌ Você excedeu o limite de pontos! Reduza alguns bônus de defesa.
          </div>
        </div>
      )}
    </div>
  );
};

export default DefensesSection;
