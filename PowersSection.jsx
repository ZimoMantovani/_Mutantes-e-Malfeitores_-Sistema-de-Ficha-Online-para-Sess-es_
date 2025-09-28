import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Zap, X } from 'lucide-react';
import { useCharacter } from '../contexts/CharacterContext';
import { 
  BASE_EFFECTS, 
  POWER_EXTRAS, 
  POWER_FLAWS, 
  POWER_ICONS,
  calculatePowerCost,
  createInitialPower
} from '../data/powersData';
import { getRemainingPoints } from '../data/characterData';
import InfoTooltip, { InfoIcon } from './InfoTooltip';

const PowerEditor = ({ power, onSave, onCancel, isNew = false }) => {
  const [editingPower, setEditingPower] = useState(power || createInitialPower());

  const updatePower = (field, value) => {
    const updated = { ...editingPower, [field]: value };
    
    // Recalcular custo quando mudanças relevantes são feitas
    if (['baseEffect', 'rank', 'extras', 'flaws'].includes(field)) {
      updated.cost = calculatePowerCost(updated);
    }
    
    setEditingPower(updated);
  };

  const addExtra = (extra) => {
    const newExtras = [...(editingPower.extras || []), extra];
    updatePower('extras', newExtras);
  };

  const removeExtra = (index) => {
    const newExtras = editingPower.extras.filter((_, i) => i !== index);
    updatePower('extras', newExtras);
  };

  const addFlaw = (flaw) => {
    const newFlaws = [...(editingPower.flaws || []), flaw];
    updatePower('flaws', newFlaws);
  };

  const removeFlaw = (index) => {
    const newFlaws = editingPower.flaws.filter((_, i) => i !== index);
    updatePower('flaws', newFlaws);
  };

  const handleSave = () => {
    const finalPower = {
      ...editingPower,
      cost: calculatePowerCost(editingPower)
    };
    onSave(finalPower);
  };

  const availableExtras = POWER_EXTRAS.filter(extra => 
    extra.applicableTo.includes('all') || 
    (editingPower.baseEffect && extra.applicableTo.includes(editingPower.baseEffect.type))
  );

  const availableFlaws = POWER_FLAWS.filter(flaw => 
    flaw.applicableTo.includes('all') || 
    (editingPower.baseEffect && flaw.applicableTo.includes(editingPower.baseEffect.type))
  );

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* Nome e Ícone */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium mb-2">Nome do Poder</label>
          <Input
            value={editingPower.name}
            onChange={(e) => updatePower('name', e.target.value)}
            placeholder="Ex: Rajada de Fogo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Ícone</label>
          <Select value={editingPower.icon} onValueChange={(value) => updatePower('icon', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {POWER_ICONS.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  <span className="text-lg">{icon}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Efeito Base */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Efeito Base
          <InfoIcon content="O efeito base determina o que o poder faz fundamentalmente. Cada efeito tem um custo base por graduação." />
        </label>
        <Select 
          value={editingPower.baseEffect?.name || ''} 
          onValueChange={(value) => {
            const effect = BASE_EFFECTS.find(e => e.name === value);
            updatePower('baseEffect', effect);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um efeito base" />
          </SelectTrigger>
          <SelectContent>
            {BASE_EFFECTS.map((effect) => (
              <SelectItem key={effect.name} value={effect.name}>
                <div>
                  <div className="font-medium">{effect.name}</div>
                  <div className="text-xs text-gray-500">{effect.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Graduação */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Graduação
          <InfoIcon content="A graduação determina a potência do poder. Cada graduação multiplica o custo base." />
        </label>
        <Input
          type="number"
          min="1"
          max="20"
          value={editingPower.rank}
          onChange={(e) => updatePower('rank', parseInt(e.target.value) || 1)}
        />
      </div>

      {/* Descrição */}
      <div>
        <label className="block text-sm font-medium mb-2">Descrição</label>
        <Textarea
          value={editingPower.description}
          onChange={(e) => updatePower('description', e.target.value)}
          placeholder="Descreva como o poder funciona e aparenta..."
          rows={3}
        />
      </div>

      {/* Extras */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <label className="block text-sm font-medium">Extras</label>
          <InfoIcon content="Extras aumentam o custo do poder mas adicionam capacidades úteis." />
        </div>
        
        <div className="space-y-2">
          {editingPower.extras?.map((extra, index) => (
            <div key={index} className="flex items-center justify-between bg-green-50 p-2 rounded">
              <div>
                <span className="font-medium text-green-800">{extra.name}</span>
                <span className="text-sm text-green-600 ml-2">({extra.costModifier})</span>
                <div className="text-xs text-green-700">{extra.description}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExtra(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          <Select onValueChange={(value) => {
            const extra = availableExtras.find(e => e.name === value);
            if (extra) addExtra(extra);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Adicionar extra" />
            </SelectTrigger>
            <SelectContent>
              {availableExtras.map((extra) => (
                <SelectItem key={extra.name} value={extra.name}>
                  <div>
                    <div className="font-medium">{extra.name} ({extra.costModifier})</div>
                    <div className="text-xs text-gray-500">{extra.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Complicações */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <label className="block text-sm font-medium">Complicações</label>
          <InfoIcon content="Complicações reduzem o custo do poder mas adicionam limitações ou desvantagens." />
        </div>
        
        <div className="space-y-2">
          {editingPower.flaws?.map((flaw, index) => (
            <div key={index} className="flex items-center justify-between bg-red-50 p-2 rounded">
              <div>
                <span className="font-medium text-red-800">{flaw.name}</span>
                <span className="text-sm text-red-600 ml-2">({flaw.costModifier})</span>
                <div className="text-xs text-red-700">{flaw.description}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFlaw(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          <Select onValueChange={(value) => {
            const flaw = availableFlaws.find(f => f.name === value);
            if (flaw) addFlaw(flaw);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Adicionar complicação" />
            </SelectTrigger>
            <SelectContent>
              {availableFlaws.map((flaw) => (
                <SelectItem key={flaw.name} value={flaw.name}>
                  <div>
                    <div className="font-medium">{flaw.name} ({flaw.costModifier})</div>
                    <div className="text-xs text-gray-500">{flaw.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notas */}
      <div>
        <label className="block text-sm font-medium mb-2">Notas</label>
        <Textarea
          value={editingPower.notes}
          onChange={(e) => updatePower('notes', e.target.value)}
          placeholder="Notas adicionais, regras especiais, etc..."
          rows={2}
        />
      </div>

      {/* Custo Total */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="text-lg font-semibold text-blue-800">
          Custo Total: {calculatePowerCost(editingPower)} pontos
        </div>
        {editingPower.baseEffect && (
          <div className="text-sm text-blue-600 mt-1">
            Base: {editingPower.baseEffect.baseCost} × {editingPower.rank} = {editingPower.baseEffect.baseCost * editingPower.rank}
            {editingPower.extras?.length > 0 && (
              <span> + Extras: {editingPower.extras.reduce((sum, extra) => sum + parseInt(extra.costModifier.replace(/[^-\d]/g, '')), 0) * editingPower.rank}</span>
            )}
            {editingPower.flaws?.length > 0 && (
              <span> + Complicações: {editingPower.flaws.reduce((sum, flaw) => sum + parseInt(flaw.costModifier.replace(/[^-\d]/g, '')), 0) * editingPower.rank}</span>
            )}
          </div>
        )}
      </div>

      {/* Botões */}
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSave}
          disabled={!editingPower.name || !editingPower.baseEffect}
        >
          {isNew ? 'Criar Poder' : 'Salvar Alterações'}
        </Button>
      </div>
    </div>
  );
};

const PowersSection = () => {
  const { character, dispatch, actions } = useCharacter();
  const remainingPoints = getRemainingPoints(character);
  const [editingPowerIndex, setEditingPowerIndex] = useState(null);
  const [isCreatingPower, setIsCreatingPower] = useState(false);

  const addPower = (power) => {
    dispatch({
      type: actions.ADD_POWER,
      payload: power
    });
    setIsCreatingPower(false);
  };

  const updatePower = (index, updates) => {
    dispatch({
      type: actions.UPDATE_POWER,
      payload: { index, updates }
    });
    setEditingPowerIndex(null);
  };

  const removePower = (index) => {
    dispatch({
      type: actions.REMOVE_POWER,
      payload: { index }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-800">Poderes</h2>
          <InfoIcon content="Poderes são as habilidades especiais do seu personagem. Cada poder tem um efeito base, graduação e pode ter extras e complicações que modificam seu custo." />
        </div>
        
        <Dialog open={isCreatingPower} onOpenChange={setIsCreatingPower}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Poder
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Poder</DialogTitle>
            </DialogHeader>
            <PowerEditor
              onSave={addPower}
              onCancel={() => setIsCreatingPower(false)}
              isNew={true}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Poderes */}
      <div className="space-y-4">
        {character.poderes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Zap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum poder criado ainda.</p>
            <p className="text-sm">Clique em "Novo Poder" para começar.</p>
          </div>
        ) : (
          character.poderes.map((power, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{power.icon}</span>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{power.name}</h3>
                      {power.baseEffect && (
                        <div className="text-sm text-gray-600">
                          {power.baseEffect.name} {power.rank}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {power.description && (
                    <p className="text-gray-700 mb-3">{power.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {power.extras?.map((extra, extraIndex) => (
                      <Badge key={extraIndex} variant="secondary" className="bg-green-100 text-green-800">
                        {extra.name}
                      </Badge>
                    ))}
                    {power.flaws?.map((flaw, flawIndex) => (
                      <Badge key={flawIndex} variant="secondary" className="bg-red-100 text-red-800">
                        {flaw.name}
                      </Badge>
                    ))}
                  </div>
                  
                  {power.notes && (
                    <div className="text-sm text-gray-600 bg-gray-100 p-2 rounded">
                      <strong>Notas:</strong> {power.notes}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-end gap-2 ml-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">
                      {power.cost} pontos
                    </div>
                    {power.baseEffect && (
                      <div className="text-xs text-gray-500">
                        Graduação {power.rank}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-1">
                    <Dialog 
                      open={editingPowerIndex === index} 
                      onOpenChange={(open) => setEditingPowerIndex(open ? index : null)}
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Editar Poder</DialogTitle>
                        </DialogHeader>
                        <PowerEditor
                          power={power}
                          onSave={(updatedPower) => updatePower(index, updatedPower)}
                          onCancel={() => setEditingPowerIndex(null)}
                        />
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePower(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Informações sobre o sistema de poderes */}
      <div className="mt-6 bg-purple-50 p-4 rounded-lg">
        <h4 className="font-semibold text-purple-800 mb-2">Sistema de Poderes</h4>
        <div className="text-purple-700 text-sm space-y-1">
          <p>• <strong>Efeito Base:</strong> Determina o que o poder faz (Blast, Flight, etc.)</p>
          <p>• <strong>Graduação:</strong> Define a potência (1-20, multiplica o custo base)</p>
          <p>• <strong>Extras:</strong> Melhoram o poder (+1 ponto por graduação cada)</p>
          <p>• <strong>Complicações:</strong> Limitam o poder (-1 ponto por graduação cada)</p>
        </div>
      </div>

      {remainingPoints < 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-800 text-sm font-medium">
            ❌ Você excedeu o limite de pontos! Reduza alguns poderes ou suas graduações.
          </div>
        </div>
      )}
    </div>
  );
};

export default PowersSection;
