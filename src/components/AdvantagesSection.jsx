import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Star, AlertTriangle, Edit } from 'lucide-react';
import { useCharacter } from '../contexts/CharacterContext';
import InfoTooltip, { InfoIcon } from './InfoTooltip';

const AdvantagesSection = () => {
  const { character, dispatch, actions } = useCharacter();
  
  // Estados para vantagens
  const [advantageDialogOpen, setAdvantageDialogOpen] = useState(false);
  const [newAdvantage, setNewAdvantage] = useState({
    name: '',
    description: '',
    cost: 1
  });
  
  // Estados para complicações
  const [complicationDialogOpen, setComplicationDialogOpen] = useState(false);
  const [newComplication, setNewComplication] = useState({
    name: '',
    description: '',
    points: 1
  });

  const addAdvantage = () => {
    if (newAdvantage.name.trim()) {
      dispatch({
        type: actions.ADD_ADVANTAGE,
        payload: {
          name: newAdvantage.name.trim(),
          description: newAdvantage.description.trim(),
          cost: newAdvantage.cost
        }
      });
      setNewAdvantage({ name: '', description: '', cost: 1 });
      setAdvantageDialogOpen(false);
    }
  };

  const removeAdvantage = (index) => {
    dispatch({
      type: actions.REMOVE_ADVANTAGE,
      payload: { index }
    });
  };

  const addComplication = () => {
    if (newComplication.name.trim()) {
      dispatch({
        type: actions.ADD_COMPLICATION,
        payload: {
          name: newComplication.name.trim(),
          description: newComplication.description.trim(),
          points: newComplication.points
        }
      });
      setNewComplication({ name: '', description: '', points: 1 });
      setComplicationDialogOpen(false);
    }
  };

  const removeComplication = (index) => {
    dispatch({
      type: actions.REMOVE_COMPLICATION,
      payload: { index }
    });
  };

  const totalAdvantagePoints = character.vantagens?.reduce((sum, adv) => sum + (adv.cost || 1), 0) || 0;
  const totalComplicationPoints = character.complicacoes?.reduce((sum, comp) => sum + (comp.points || 1), 0) || 0;

  return (
    <div className="space-y-6">
      {/* Vantagens */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-600" />
            Vantagens
            <InfoIcon content="Vantagens são habilidades especiais, talentos ou recursos que seu personagem possui. Cada vantagem tem um custo em pontos." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Lista de Vantagens */}
            {character.vantagens && character.vantagens.length > 0 ? (
              <div className="space-y-3">
                {character.vantagens.map((advantage, index) => (
                  <div key={index} className="flex items-start justify-between p-3 border rounded-lg bg-card">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{advantage.name}</h4>
                        <Badge variant="secondary">{advantage.cost || 1} pts</Badge>
                      </div>
                      {advantage.description && (
                        <p className="text-sm text-muted-foreground">{advantage.description}</p>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeAdvantage(index)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Star className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhuma vantagem</p>
              </div>
            )}

            {/* Botão para adicionar vantagem */}
            <Dialog open={advantageDialogOpen} onOpenChange={setAdvantageDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Vantagem
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nova Vantagem</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="advantage-name">Nome da Vantagem *</Label>
                    <Input
                      id="advantage-name"
                      value={newAdvantage.name}
                      onChange={(e) => setNewAdvantage({...newAdvantage, name: e.target.value})}
                      placeholder="Ex: Ataque Poderoso, Defesa Aprimorada"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="advantage-description">Descrição</Label>
                    <Textarea
                      id="advantage-description"
                      value={newAdvantage.description}
                      onChange={(e) => setNewAdvantage({...newAdvantage, description: e.target.value})}
                      placeholder="Descreva o que esta vantagem faz e como funciona..."
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="advantage-cost">Custo em Pontos</Label>
                    <Input
                      id="advantage-cost"
                      type="number"
                      min="1"
                      value={newAdvantage.cost}
                      onChange={(e) => setNewAdvantage({...newAdvantage, cost: parseInt(e.target.value) || 1})}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={addAdvantage} className="flex-1">
                      Adicionar
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setAdvantageDialogOpen(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Resumo de pontos */}
            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
              <div className="text-sm">
                <span className="font-medium text-yellow-800 dark:text-yellow-200">
                  Vantagens: {totalAdvantagePoints} pts
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complicações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Complicações
            <InfoIcon content="Complicações são desvantagens, fraquezas ou limitações do seu personagem que concedem pontos extras para gastar em outras áreas." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Lista de Complicações */}
            {character.complicacoes && character.complicacoes.length > 0 ? (
              <div className="space-y-3">
                {character.complicacoes.map((complication, index) => (
                  <div key={index} className="flex items-start justify-between p-3 border rounded-lg bg-card">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{complication.name}</h4>
                        <Badge variant="destructive">+{complication.points || 1} pts</Badge>
                      </div>
                      {complication.description && (
                        <p className="text-sm text-muted-foreground">{complication.description}</p>
                      )}
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
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <AlertTriangle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhuma complicação</p>
              </div>
            )}

            {/* Botão para adicionar complicação */}
            <Dialog open={complicationDialogOpen} onOpenChange={setComplicationDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Complicação
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nova Complicação</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="complication-name">Nome da Complicação *</Label>
                    <Input
                      id="complication-name"
                      value={newComplication.name}
                      onChange={(e) => setNewComplication({...newComplication, name: e.target.value})}
                      placeholder="Ex: Identidade Secreta, Fraqueza"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="complication-description">Descrição</Label>
                    <Textarea
                      id="complication-description"
                      value={newComplication.description}
                      onChange={(e) => setNewComplication({...newComplication, description: e.target.value})}
                      placeholder="Descreva como esta complicação afeta seu personagem..."
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="complication-points">Pontos Ganhos</Label>
                    <Input
                      id="complication-points"
                      type="number"
                      min="1"
                      value={newComplication.points}
                      onChange={(e) => setNewComplication({...newComplication, points: parseInt(e.target.value) || 1})}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={addComplication} className="flex-1">
                      Adicionar
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setComplicationDialogOpen(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Resumo de pontos */}
            <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
              <div className="text-sm">
                <span className="font-medium text-red-800 dark:text-red-200">
                  Complicações: +{totalComplicationPoints} pts
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Equipamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={character.equipamentos || ''}
            onChange={(e) => dispatch({
              type: actions.UPDATE_EQUIPMENT,
              payload: e.target.value
            })}
            placeholder="Liste os equipamentos, armas, dispositivos e outros itens que seu personagem possui..."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Resumo Total */}
      <Card>
        <CardHeader>
          <CardTitle>Vantagens & Complicações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {totalAdvantagePoints}
              </div>
              <div className="text-sm text-yellow-700 dark:text-yellow-300">
                Vantagens: {totalAdvantagePoints} pts
              </div>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                +{totalComplicationPoints}
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">
                Complicações: +{totalComplicationPoints} pts
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvantagesSection;
