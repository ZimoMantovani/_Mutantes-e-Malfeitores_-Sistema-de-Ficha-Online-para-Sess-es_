import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';
import { useCharacter } from '../contexts/CharacterContext';
import { ATTRIBUTES, getRemainingPoints } from '../data/characterData';
import InfoTooltip, { InfoIcon } from './InfoTooltip';

const AttributesSection = () => {
  const { character, dispatch, actions } = useCharacter();
  const remainingPoints = getRemainingPoints(character);

  const updateAttribute = (attribute, newValue) => {
    const clampedValue = Math.max(-5, Math.min(20, newValue));
    dispatch({
      type: actions.UPDATE_ATTRIBUTE,
      payload: { attribute, value: clampedValue }
    });
  };

  const canIncrease = (attribute) => {
    const currentValue = character.atributos[attribute] || 0;
    return currentValue < 20 && remainingPoints >= 2;
  };

  const canDecrease = (attribute) => {
    const currentValue = character.atributos[attribute] || 0;
    return currentValue > 0;
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-bold text-foreground">Atributos</h2>
        <InfoIcon content="Atributos custam 2 pontos por nível. Valores variam de 0 a 20. No sistema M&M, os atributos são valores diretos usados em rolagens e cálculos." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ATTRIBUTES.map((attr) => {
          const value = character.atributos[attr.key] || 0;
          const cost = value * 2;

          return (
            <div key={attr.key} className="border border-border rounded-lg p-4 bg-card">
              <div className="text-center mb-3">
                <InfoTooltip 
                  content={`${attr.name}: Atributo fundamental que afeta várias perícias e capacidades. Custo atual: ${cost} pontos. Limite máximo: 20.`}
                  className="block"
                >
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                    {attr.name}
                  </h3>
                </InfoTooltip>
                <div className="text-xs text-muted-foreground mt-1">
                  ({attr.abbreviation})
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateAttribute(attr.key, value - 1)}
                  disabled={!canDecrease(attr.key)}
                  className="w-8 h-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <div className="text-center min-w-[60px]">
                  <div className="text-2xl font-bold text-foreground">
                    {value}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateAttribute(attr.key, value + 1)}
                  disabled={!canIncrease(attr.key)}
                  className="w-8 h-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-center">
                <div className="text-xs text-muted-foreground">
                  Custo: {cost} pontos
                </div>
                {value === 20 && (
                  <div className="text-xs text-amber-600 font-medium mt-1">
                    Máximo atingido
                  </div>
                )}
              </div>

              {/* Input direto para valores específicos */}
              <div className="mt-3">
                <Input
                  type="number"
                  min="-5"
                  max="20"
                  value={value}
                  onChange={(e) => updateAttribute(attr.key, parseInt(e.target.value) || 0)}
                  className="text-center text-sm h-8"
                  placeholder="0"
                />
              </div>
            </div>
          );
        })}
      </div>

      {remainingPoints < 4 && remainingPoints > 0 && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="text-amber-800 text-sm font-medium">
            ⚠️ Poucos pontos restantes para atributos (cada nível custa 2 pontos)
          </div>
        </div>
      )}

      {remainingPoints < 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-800 text-sm font-medium">
            ❌ Você excedeu o limite de pontos! Reduza alguns atributos.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttributesSection;
