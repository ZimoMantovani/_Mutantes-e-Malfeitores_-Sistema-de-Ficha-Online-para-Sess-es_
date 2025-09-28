import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Star, AlertTriangle } from 'lucide-react';
import { useCharacter } from '../contexts/CharacterContext';
import { COMMON_ADVANTAGES, COMMON_COMPLICATIONS } from '../data/characterData';
import InfoTooltip, { InfoIcon } from './InfoTooltip';

const AdvantagesSection = () => {
  const { character, dispatch, actions } = useCharacter();
  const [newAdvantage, setNewAdvantage] = useState('');
  const [newComplication, setNewComplication] = useState('');
  const [customAdvantage, setCustomAdvantage] = useState('');
  const [customComplication, setCustomComplication] = useState('');

  const addAdvantage = (advantageName) => {
    if (advantageName.trim()) {
      dispatch({
        type: actions.ADD_ADVANTAGE,
        payload: { name: advantageName.trim(), cost: 1 }
      });
      setNewAdvantage('');
      setCustomAdvantage('');
    }
  };

  const removeAdvantage = (index) => {
    dispatch({
      type: actions.REMOVE_ADVANTAGE,
      payload: { index }
    });
  };

  const addComplication = (complicationName) => {
    if (complicationName.trim()) {
      dispatch({
        type: actions.ADD_COMPLICATION,
        payload: { name: complicationName.trim(), points: 1 }
      });
      setNewComplication('');
      setCustomComplication('');
    }
  };

  const removeComplication = (index) => {
    dispatch({
      type: actions.REMOVE_COMPLICATION,
      payload: { index }
    });
  };

  return (
    <div className="space-y-4">
      
      {/* Vantagens */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Star className="w-5 h-5 text-yellow-600" />
            Vantagens
            <InfoIcon content="Vantagens são capacidades especiais que custam pontos de poder. Cada vantagem geralmente custa 1 ponto." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            
            {/* Lista de Vantagens */}
            <div className="space-y-2">
              {character.vantagens.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  <Star className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Nenhuma vantagem</p>
                </div>
              ) : (
                character.vantagens.map((advantage, index) => (
                  <div key={index} className="flex items-center justify-between bg-yellow-50 p-2 rounded border border-yellow-200">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">
                        {advantage.name || advantage}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAdvantage(index)}
                      className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Adicionar Vantagem */}
            <div className="space-y-2">
              <Select value={newAdvantage} onValueChange={setNewAdvantage}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar vantagem..." />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_ADVANTAGES.map((advantage) => (
                    <SelectItem key={advantage} value={advantage}>
                      {advantage}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Outra (personalizada)</SelectItem>
                </SelectContent>
              </Select>

              {newAdvantage === 'custom' && (
                <Input
                  placeholder="Nome da vantagem personalizada"
                  value={customAdvantage}
                  onChange={(e) => setCustomAdvantage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addAdvantage(customAdvantage)}
                />
              )}

              <Button
                onClick={() => addAdvantage(newAdvantage === 'custom' ? customAdvantage : newAdvantage)}
                disabled={!newAdvantage || (newAdvantage === 'custom' && !customAdvantage.trim())}
                className="w-full"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Vantagem
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complicações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Complicações
            <InfoIcon content="Complicações são limitações ou desvantagens que concedem pontos extras para gastar em outras áreas. Cada complicação geralmente concede 1 ponto." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            
            {/* Lista de Complicações */}
            <div className="space-y-2">
              {character.complicacoes.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Nenhuma complicação</p>
                </div>
              ) : (
                character.complicacoes.map((complication, index) => (
                  <div key={index} className="flex items-center justify-between bg-red-50 p-2 rounded border border-red-200">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="font-medium text-red-800">
                        {complication.name || complication}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeComplication(index)}
                      className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Adicionar Complicação */}
            <div className="space-y-2">
              <Select value={newComplication} onValueChange={setNewComplication}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar complicação..." />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_COMPLICATIONS.map((complication) => (
                    <SelectItem key={complication} value={complication}>
                      {complication}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Outra (personalizada)</SelectItem>
                </SelectContent>
              </Select>

              {newComplication === 'custom' && (
                <Input
                  placeholder="Nome da complicação personalizada"
                  value={customComplication}
                  onChange={(e) => setCustomComplication(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addComplication(customComplication)}
                />
              )}

              <Button
                onClick={() => addComplication(newComplication === 'custom' ? customComplication : newComplication)}
                disabled={!newComplication || (newComplication === 'custom' && !customComplication.trim())}
                className="w-full"
                size="sm"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Complicação
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipamentos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Equipamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none"
            rows={4}
            placeholder="Liste equipamentos, veículos, quartel general, etc..."
            value={character.equipamentos || ''}
            onChange={(e) => dispatch({
              type: actions.UPDATE_EQUIPMENT,
              payload: e.target.value
            })}
          />
        </CardContent>
      </Card>

      {/* Resumo de Pontos */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-4">
          <div className="text-center">
            <div className="text-sm text-blue-600 mb-1">Vantagens & Complicações</div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-yellow-700">
                Vantagens: {character.vantagens.length} pts
              </span>
              <span className="text-red-700">
                Complicações: +{character.complicacoes.length} pts
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvantagesSection;
