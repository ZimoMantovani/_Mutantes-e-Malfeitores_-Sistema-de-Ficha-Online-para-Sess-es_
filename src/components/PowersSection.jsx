import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Plus, 
  Trash2, 
  Zap, 
  Edit, 
  ChevronDown, 
  ChevronRight,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useCharacter } from '../contexts/CharacterContext';
import InfoTooltip, { InfoIcon } from './InfoTooltip';

// Ícones disponíveis para poderes
const POWER_ICONS = [
  '⚡', '🔥', '❄️', '💨', '🌊', '🌍', '✨', '🔮', 
  '👁️', '🧠', '💪', '🛡️', '⚔️', '🏃', '🕊️', '🦅',
  '🌟', '💎', '⚡', '🔆', '🌙', '☀️', '🌈', '💫'
];

const PowersSection = () => {
  const { character, dispatch, actions } = useCharacter();
  
  // Estados para o modal de criação/edição de poder
  const [powerDialogOpen, setPowerDialogOpen] = useState(false);
  const [editingPowerIndex, setEditingPowerIndex] = useState(null);
const [newPower, setNewPower] = useState({
  name: '',
  icon: '⚡',
  baseEffect: '',
  customBaseCost: 1, // ← NOVO
  rank: 1,
  description: '',
  extras: [],
  complications: [],
  fixedModifier: 0, // ← NOVO
  notes: '',
  totalCost: 0
});

  // Estados para extras e complicações
  const [newExtra, setNewExtra] = useState({ name: '', description: '', costPerRank: 1 });
  const [newComplication, setNewComplication] = useState({ name: '', description: '', pointsPerRank: -1 });

  const resetPowerForm = () => {
    setNewPower({
      name: '',
      icon: '⚡',
      baseEffect: '',
      rank: 1,
      description: '',
      extras: [],
      complications: [],
      notes: '',
      totalCost: 0
    });
    setEditingPowerIndex(null);
  };

const calculatePowerCost = (power) => {
  if (!power.rank) return 0;
  
  // 1. Custo base (editável)
  let baseCost = power.customBaseCost || 1;
  
  // 2. Somar extras
  let extrasTotal = 0;
  power.extras?.forEach(extra => {
    extrasTotal += extra.costPerRank || 1;
  });
  
  // 3. Subtrair complicações
  let complicationsTotal = 0;
  power.complications?.forEach(comp => {
    complicationsTotal += Math.abs(comp.pointsPerRank || 1);
  });
  
  // 4. Fórmula: (custo base + extras - complicações) × graduação
  let subtotal = baseCost + extrasTotal - complicationsTotal;
  let totalCost = Math.max(1, subtotal) * power.rank;
  
  // 5. Somar modificador fixo
  if (power.fixedModifier) {
    totalCost += power.fixedModifier;
  }
  
  return Math.max(0, totalCost);
};


  const addExtra = () => {
    if (newExtra.name.trim()) {
      setNewPower({
        ...newPower,
        extras: [...(newPower.extras || []), { ...newExtra }]
      });
      setNewExtra({ name: '', description: '', costPerRank: 1 });
    }
  };

  const removeExtra = (index) => {
    const updatedExtras = newPower.extras.filter((_, i) => i !== index);
    setNewPower({ ...newPower, extras: updatedExtras });
  };

  const addComplication = () => {
    if (newComplication.name.trim()) {
      setNewPower({
        ...newPower,
        complications: [...(newPower.complications || []), { ...newComplication }]
      });
      setNewComplication({ name: '', description: '', pointsPerRank: -1 });
    }
  };

  const removeComplication = (index) => {
    const updatedComplications = newPower.complications.filter((_, i) => i !== index);
    setNewPower({ ...newPower, complications: updatedComplications });
  };

  const savePower = () => {
    if (!newPower.name.trim()) return;

    const powerToSave = {
      ...newPower,
      totalCost: calculatePowerCost(newPower)
    };

    if (editingPowerIndex !== null) {
      // Editando poder existente
      dispatch({
        type: actions.UPDATE_POWER,
        payload: { index: editingPowerIndex, power: powerToSave }
      });
    } else {
      // Adicionando novo poder
      dispatch({
        type: actions.ADD_POWER,
        payload: powerToSave
      });
    }

    resetPowerForm();
    setPowerDialogOpen(false);
  };

  const editPower = (index) => {
    const power = character.poderes[index];
    setNewPower({ ...power });
    setEditingPowerIndex(index);
    setPowerDialogOpen(true);
  };

  const removePower = (index) => {
    dispatch({
      type: actions.REMOVE_POWER,
      payload: { index }
    });
  };

  const totalPowerPoints = character.poderes?.reduce((sum, power) => sum + (power.totalCost || 0), 0) || 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Poderes
            <InfoIcon content="Poderes são habilidades especiais do seu personagem. Cada poder tem um efeito base, graduação, extras (que aumentam o custo) e complicações (que reduzem o custo)." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Lista de Poderes */}
            {character.poderes && character.poderes.length > 0 ? (
              <div className="space-y-4">
                {character.poderes.map((power, index) => (
                  <PowerCard 
                    key={index} 
                    power={power} 
                    index={index}
                    onEdit={editPower}
                    onRemove={removePower}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Zap className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhum poder criado ainda.</p>
                <p className="text-sm">Clique em "Novo Poder" para começar.</p>
              </div>
            )}

            {/* Botão para adicionar poder */}
            <Dialog open={powerDialogOpen} onOpenChange={setPowerDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={resetPowerForm}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Poder
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingPowerIndex !== null ? 'Editar Poder' : 'Criar Novo Poder'}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Informações Básicas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="power-name">Nome do Poder *</Label>
                      <Input
                        id="power-name"
                        value={newPower.name}
                        onChange={(e) => setNewPower({...newPower, name: e.target.value})}
                        placeholder="Ex: Rajada de Fogo, Voo, Telepatia"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="power-icon">Ícone</Label>
                      <div className="flex gap-2 flex-wrap mt-2">
                        {POWER_ICONS.map((icon, index) => (
                          <Button
                            key={index}
                            variant={newPower.icon === icon ? "default" : "outline"}
                            size="sm"
                            onClick={() => setNewPower({...newPower, icon})}
                            className="w-10 h-10 p-0"
                          >
                            {icon}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Efeito Base e Graduação */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="base-effect">Efeito Base *</Label>
                      <Input
                        id="base-effect"
                        value={newPower.baseEffect}
                        onChange={(e) => setNewPower({...newPower, baseEffect: e.target.value})}
                        placeholder="Ex: Blast, Flight, Mind Reading"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="power-rank">Graduação</Label>
                      <Input
                        id="power-rank"
                        type="number"
                        min="1"
                        value={newPower.rank}
                        onChange={(e) => setNewPower({...newPower, rank: parseInt(e.target.value) || 1})}
                      />
                    </div>
                  </div>

                  {/* Custo Base Editável */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="custom-base-cost">
                        Custo Base (editável) *
                        <InfoTooltip content="Digite o custo base do efeito conforme a tabela de M&M. Exemplo: Blast = 2, Damage = 2, Protection = 1" />
                      </Label>
                      <Input
                        id="custom-base-cost"
                        type="number"
                        min="1"
                        value={newPower.customBaseCost}
                        onChange={(e) => setNewPower({...newPower, customBaseCost: parseInt(e.target.value) || 1})}
                        placeholder="Ex: 2"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="power-rank">
                        Graduação
                      </Label>
                      <Input
                        id="power-rank"
                        type="number"
                        min="1"
                        value={newPower.rank}
                        onChange={(e) => setNewPower({...newPower, rank: parseInt(e.target.value) || 1})}
                      />
                    </div>
                  </div>

                  {/* Modificador Fixo */}
                  <div className="space-y-2">
                    <Label htmlFor="fixed-modifier">
                      Modificador Fixo
                      <InfoTooltip content="Valor que será somado ao custo final após todos os cálculos (opcional)" />
                    </Label>
                    <Input
                      id="fixed-modifier"
                      type="number"
                      value={newPower.fixedModifier}
                      onChange={(e) => setNewPower({...newPower, fixedModifier: parseInt(e.target.value) || 0})}
                      placeholder="0"
                    />
                  </div>

                  {/* Descrição */}
                  <div>
                    <Label htmlFor="power-description">Descrição</Label>
                    <Textarea
                      id="power-description"
                      value={newPower.description}
                      onChange={(e) => setNewPower({...newPower, description: e.target.value})}
                      placeholder="Descreva como o poder funciona e aparenta..."
                      rows={3}
                    />
                  </div>

                  {/* Extras */}
                  <div>
                    <Label className="text-base font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-green-600" />
                      Extras
                    </Label>
                    <div className="space-y-3 mt-2">
                      {newPower.extras?.map((extra, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
                          <div className="flex-1">
                            <div className="font-medium">{extra.name}</div>
                            {extra.description && (
                              <div className="text-sm text-muted-foreground">{extra.description}</div>
                            )}
                            <div className="text-sm text-green-600">+{extra.costPerRank} ponto(s) por graduação</div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeExtra(index)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                      
                      {/* Adicionar Extra */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 border-2 border-dashed border-green-300 rounded-lg">
                        <Input
                          placeholder="Nome do extra"
                          value={newExtra.name}
                          onChange={(e) => setNewExtra({...newExtra, name: e.target.value})}
                        />
                        <Input
                          placeholder="Descrição (opcional)"
                          value={newExtra.description}
                          onChange={(e) => setNewExtra({...newExtra, description: e.target.value})}
                        />
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Custo"
                            value={newExtra.costPerRank}
                            onChange={(e) => setNewExtra({...newExtra, costPerRank: parseInt(e.target.value) || 1})}
                            className="w-20"
                          />
                          <Button onClick={addExtra} size="sm">
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Complicações */}
                  <div>
                    <Label className="text-base font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      Complicações
                    </Label>
                    <div className="space-y-3 mt-2">
                      {newPower.complications?.map((comp, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 border rounded-lg bg-red-50 dark:bg-red-950/20">
                          <div className="flex-1">
                            <div className="font-medium">{comp.name}</div>
                            {comp.description && (
                              <div className="text-sm text-muted-foreground">{comp.description}</div>
                            )}
                            <div className="text-sm text-red-600">{comp.pointsPerRank} ponto(s) por graduação</div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeComplication(index)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                      
                      {/* Adicionar Complicação */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 border-2 border-dashed border-red-300 rounded-lg">
                        <Input
                          placeholder="Nome da complicação"
                          value={newComplication.name}
                          onChange={(e) => setNewComplication({...newComplication, name: e.target.value})}
                        />
                        <Input
                          placeholder="Descrição (opcional)"
                          value={newComplication.description}
                          onChange={(e) => setNewComplication({...newComplication, description: e.target.value})}
                        />
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Desconto"
                            value={newComplication.pointsPerRank}
                            onChange={(e) => setNewComplication({...newComplication, pointsPerRank: parseInt(e.target.value) || -1})}
                            className="w-20"
                          />
                          <Button onClick={addComplication} size="sm">
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notas */}
                  <div>
                    <Label htmlFor="power-notes">Notas</Label>
                    <Textarea
                      id="power-notes"
                      value={newPower.notes}
                      onChange={(e) => setNewPower({...newPower, notes: e.target.value})}
                      placeholder="Notas adicionais, regras especiais, etc..."
                      rows={2}
                    />
                  </div>

                  {/* Custo Total */}
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="font-semibold text-blue-900">
                      Custo Total: {calculatePowerCost(newPower)} pontos
                    </div>
                    <div className="text-sm text-blue-700 mt-1">
                      ({newPower.customBaseCost || 1} base + {newPower.extras?.reduce((sum, extra) => sum + (extra.costPerRank || 1), 0) || 0} extras - {newPower.complications?.reduce((sum, comp) => sum + Math.abs(comp.pointsPerRank || 1), 0) || 0} complicações) × {newPower.rank} graduação {newPower.fixedModifier ? `+ ${newPower.fixedModifier} fixo` : ''}
                    </div>
                  </div>


                  {/* Botões */}
                  <div className="flex gap-2">
                    <Button onClick={savePower} className="flex-1">
                      {editingPowerIndex !== null ? 'Salvar Alterações' : 'Criar Poder'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setPowerDialogOpen(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Resumo de pontos */}
            <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
              <div className="text-sm">
                <span className="font-medium text-purple-800 dark:text-purple-200">
                  Poderes: {totalPowerPoints} pts
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sistema de Poderes - Explicação */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sistema de Poderes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>Efeito Base:</strong> Determina o que o poder faz (Blast, Flight, etc.)</p>
            <p><strong>Graduação:</strong> Define a potência (1-20, multiplica o custo base)</p>
            <p><strong>Extras:</strong> Melhoram o poder (+1 ponto por graduação cada)</p>
            <p><strong>Complicações:</strong> Limitam o poder (-1 ponto por graduação cada)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente para exibir um poder individual
const PowerCard = ({ power, index, onEdit, onRemove }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg bg-card">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-2xl">{power.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground">{power.name}</h4>
                <Badge variant="secondary">{power.totalCost || 0} pts</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {power.baseEffect} • Graduação {power.rank}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(index)}
            >
              <Edit className="w-3 h-3" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onRemove(index)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent className="mt-4 space-y-3">
            {power.description && (
              <div>
                <h5 className="font-medium text-sm text-foreground mb-1">Descrição:</h5>
                <p className="text-sm text-muted-foreground">{power.description}</p>
              </div>
            )}
            
            {power.extras && power.extras.length > 0 && (
              <div>
                <h5 className="font-medium text-sm text-foreground mb-1">Extras:</h5>
                <div className="space-y-1">
                  {power.extras.map((extra, i) => (
                    <div key={i} className="text-sm bg-green-50 dark:bg-green-950/20 p-2 rounded">
                      <span className="font-medium">{extra.name}</span>
                      {extra.description && <span className="text-muted-foreground"> - {extra.description}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {power.complications && power.complications.length > 0 && (
              <div>
                <h5 className="font-medium text-sm text-foreground mb-1">Complicações:</h5>
                <div className="space-y-1">
                  {power.complications.map((comp, i) => (
                    <div key={i} className="text-sm bg-red-50 dark:bg-red-950/20 p-2 rounded">
                      <span className="font-medium">{comp.name}</span>
                      {comp.description && <span className="text-muted-foreground"> - {comp.description}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {power.notes && (
              <div>
                <h5 className="font-medium text-sm text-foreground mb-1">Notas:</h5>
                <p className="text-sm text-muted-foreground">{power.notes}</p>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default PowersSection;
