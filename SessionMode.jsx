import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Dice6, 
  Heart, 
  Shield, 
  Zap, 
  User, 
  Plus, 
  Minus,
  Eye,
  Sword,
  Target
} from 'lucide-react';
import { useCharacter } from '../contexts/CharacterContext';
import { 
  ATTRIBUTES, 
  DEFENSES, 
  SKILLS,
  calculateDefenseValue, 
  calculateSkillTotal,
  calculateModifier
} from '../data/characterData';
import InfoTooltip from './InfoTooltip';

const SessionMode = () => {
  const { character, dispatch, actions } = useCharacter();
  const [heroPoints, setHeroPoints] = useState(character.pontosHeroicos || 1);
  const [conditions, setConditions] = useState([]);
  const [newCondition, setNewCondition] = useState('');

  const updateHeroPoints = (change) => {
    const newPoints = Math.max(0, heroPoints + change);
    setHeroPoints(newPoints);
    dispatch({
      type: actions.UPDATE_BASIC_INFO,
      payload: { pontosHeroicos: newPoints }
    });
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      setConditions([...conditions, newCondition.trim()]);
      setNewCondition('');
    }
  };

  const removeCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const rollD20 = (modifier) => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + modifier;
    
    // Mostrar resultado temporariamente (você pode implementar um toast aqui)
    alert(`🎲 Rolagem: ${roll} + ${modifier} = ${total}`);
    return total;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header com informações básicas */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">{character.heroi || 'Herói Sem Nome'}</CardTitle>
                <p className="text-blue-100">
                  {character.jogador && `Jogador: ${character.jogador}`}
                  {character.identidade && ` • Identidade: ${character.identidade}`}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-100">Nível de Poder</div>
                <div className="text-3xl font-bold">{character.nivelPoder}</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Coluna 1: Atributos e Perícias Principais */}
          <div className="space-y-4">
            
            {/* Atributos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Atributos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {ATTRIBUTES.map((attr) => {
                    const value = character.atributos[attr.key] || 0;
                    const modifier = calculateModifier(value);
                    
                    return (
                      <InfoTooltip
                        key={attr.key}
                        content={`${attr.name}: Role 1d20 + ${modifier >= 0 ? '+' : ''}${modifier} para testes baseados neste atributo.`}
                      >
                        <div 
                          className="bg-gray-50 p-3 rounded-lg text-center cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => rollD20(modifier)}
                        >
                          <div className="text-xs font-medium text-gray-600 uppercase">
                            {attr.abbreviation}
                          </div>
                          <div className="text-2xl font-bold text-gray-800">
                            {value}
                          </div>
                          <div className="text-sm text-blue-600 font-medium">
                            {modifier >= 0 ? '+' : ''}{modifier}
                          </div>
                        </div>
                      </InfoTooltip>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Perícias Principais */}
            <Card>
              <CardHeader>
                <CardTitle>Perícias Principais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {SKILLS.filter(skill => character.pericias[skill.key] > 0).map((skill) => {
                    const total = calculateSkillTotal(character, skill.key);
                    const ranks = character.pericias[skill.key];
                    
                    return (
                      <InfoTooltip
                        key={skill.key}
                        content={`${skill.name}: Role 1d20 + ${total} (${character.atributos[skill.baseAttribute] || 0} + ${ranks} graduações)`}
                      >
                        <div 
                          className="flex items-center justify-between p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => rollD20(total)}
                        >
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm font-bold text-green-600">+{total}</span>
                        </div>
                      </InfoTooltip>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna 2: Defesas e Combate */}
          <div className="space-y-4">
            
            {/* Defesas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Defesas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {DEFENSES.map((def) => {
                    const value = calculateDefenseValue(character, def.key);
                    
                    return (
                      <InfoTooltip
                        key={def.key}
                        content={`${def.name}: Use este valor como Classe de Dificuldade para ataques contra você.`}
                      >
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-800">
                              {def.name}
                            </span>
                            <span className="text-xl font-bold text-blue-600">
                              {value}
                            </span>
                          </div>
                        </div>
                      </InfoTooltip>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Combate */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sword className="w-5 h-5" />
                  Combate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  
                  {/* Iniciativa */}
                  <InfoTooltip content="Role 1d20 + Prontidão para determinar ordem de iniciativa no combate.">
                    <div 
                      className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
                      onClick={() => rollD20(character.atributos.prontidao || 0)}
                    >
                      <span className="font-medium text-red-800">Iniciativa</span>
                      <span className="text-lg font-bold text-red-600">
                        +{character.atributos.prontidao || 0}
                      </span>
                    </div>
                  </InfoTooltip>

                  {/* Ataques Corpo a Corpo */}
                  <InfoTooltip content="Role 1d20 + Luta para ataques corpo a corpo.">
                    <div 
                      className="flex items-center justify-between p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
                      onClick={() => rollD20(character.atributos.luta || 0)}
                    >
                      <span className="font-medium text-orange-800">Ataque C.a.C.</span>
                      <span className="text-lg font-bold text-orange-600">
                        +{character.atributos.luta || 0}
                      </span>
                    </div>
                  </InfoTooltip>

                  {/* Ataques à Distância */}
                  <InfoTooltip content="Role 1d20 + Destreza para ataques à distância.">
                    <div 
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                      onClick={() => rollD20(character.atributos.destreza || 0)}
                    >
                      <span className="font-medium text-green-800">Ataque Dist.</span>
                      <span className="text-lg font-bold text-green-600">
                        +{character.atributos.destreza || 0}
                      </span>
                    </div>
                  </InfoTooltip>
                </div>
              </CardContent>
            </Card>

            {/* Pontos Heroicos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Pontos Heroicos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateHeroPoints(-1)}
                    disabled={heroPoints <= 0}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">{heroPoints}</div>
                    <div className="text-xs text-gray-500">pontos</div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateHeroPoints(1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="mt-3 text-xs text-gray-600 text-center">
                  Use para rerolagens, recuperação e efeitos especiais
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna 3: Poderes e Condições */}
          <div className="space-y-4">
            
            {/* Poderes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Poderes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {character.poderes.length === 0 ? (
                    <div className="text-center text-gray-500 py-4">
                      <Zap className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">Nenhum poder</p>
                    </div>
                  ) : (
                    character.poderes.map((power, index) => (
                      <InfoTooltip
                        key={index}
                        content={`${power.description || 'Sem descrição'}\n\nGraduação: ${power.rank}\nCusto: ${power.cost} pontos\n\n${power.notes || ''}`}
                      >
                        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{power.icon}</span>
                            <span className="font-medium text-purple-800">{power.name}</span>
                          </div>
                          
                          {power.baseEffect && (
                            <div className="text-sm text-purple-600 mb-2">
                              {power.baseEffect.name} {power.rank}
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-1">
                            {power.extras?.map((extra, extraIndex) => (
                              <Badge key={extraIndex} variant="secondary" className="text-xs bg-green-100 text-green-700">
                                {extra.name}
                              </Badge>
                            ))}
                            {power.flaws?.map((flaw, flawIndex) => (
                              <Badge key={flawIndex} variant="secondary" className="text-xs bg-red-100 text-red-700">
                                {flaw.name}
                              </Badge>
                            ))}
                          </div>
                          
                          {power.baseEffect?.type === 'attack' && (
                            <div className="mt-2 pt-2 border-t border-purple-200">
                              <div className="text-xs text-purple-600">
                                <strong>Para Atacar:</strong> Role 1d20 + {character.atributos[power.baseEffect.range === 'close' ? 'luta' : 'destreza'] || 0}
                              </div>
                              {power.baseEffect.resistance !== 'none' && (
                                <div className="text-xs text-purple-600">
                                  <strong>Resistência:</strong> {power.baseEffect.resistance}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </InfoTooltip>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Condições e Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Condições
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-3">
                  {conditions.map((condition, index) => (
                    <div key={index} className="flex items-center justify-between bg-yellow-50 p-2 rounded">
                      <span className="text-sm font-medium text-yellow-800">{condition}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCondition(index)}
                        className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Nova condição..."
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCondition()}
                    className="text-sm"
                  />
                  <Button size="sm" onClick={addCondition}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vantagens */}
            {character.vantagens.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Vantagens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {character.vantagens.map((advantage, index) => (
                      <div key={index} className="text-sm bg-blue-50 p-2 rounded">
                        {advantage.name || advantage}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Complicações */}
            {character.complicacoes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Complicações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {character.complicacoes.map((complication, index) => (
                      <div key={index} className="text-sm bg-red-50 p-2 rounded">
                        {complication.name || complication}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Notas de Sessão */}
        {character.notas && (
          <Card>
            <CardHeader>
              <CardTitle>Notas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-700 whitespace-pre-wrap">
                {character.notas}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SessionMode;
