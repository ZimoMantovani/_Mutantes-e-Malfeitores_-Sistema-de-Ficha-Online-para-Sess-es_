import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Upload, User, Plus } from 'lucide-react';
import { useCharacter } from '../contexts/CharacterContext';
import { getTotalPoints, getRemainingPoints } from '../data/characterData';
import InfoTooltip, { InfoIcon } from './InfoTooltip';

const BasicInfoSection = () => {
  const { character, dispatch, actions } = useCharacter();
  const [imagePreview, setImagePreview] = useState(character.imagemPersonagem);
  const totalPoints = getTotalPoints(character);
  const remainingPoints = getRemainingPoints(character);

  const updateBasicInfo = (field, value) => {
    dispatch({
      type: actions.UPDATE_BASIC_INFO,
      payload: { [field]: value }
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setImagePreview(imageData);
        dispatch({
          type: actions.SET_CHARACTER_IMAGE,
          payload: imageData
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addExtraPoints = () => {
    const points = prompt('Quantos pontos extras adicionar?');
    const numPoints = parseInt(points);
    if (!isNaN(numPoints) && numPoints > 0) {
      dispatch({
        type: actions.ADD_EXTRA_POINTS,
        payload: numPoints
      });
    }
  };

  const removeExtraPoints = () => {
    const points = prompt(`Quantos pontos extras remover? (Máximo: ${character.pontosPoderExtras})`);
    const numPoints = parseInt(points);
    if (!isNaN(numPoints) && numPoints > 0) {
      dispatch({
        type: actions.REMOVE_EXTRA_POINTS,
        payload: numPoints
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Informações Pessoais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Informações do Personagem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Coluna 1 */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="heroi">Nome do Herói *</Label>
                <Input
                  id="heroi"
                  value={character.heroi}
                  onChange={(e) => updateBasicInfo('heroi', e.target.value)}
                  placeholder="Ex: Homem-Aranha"
                />
              </div>

              <div>
                <Label htmlFor="jogador">Jogador</Label>
                <Input
                  id="jogador"
                  value={character.jogador}
                  onChange={(e) => updateBasicInfo('jogador', e.target.value)}
                  placeholder="Nome do jogador"
                />
              </div>

              <div>
                <Label htmlFor="identidade">Identidade Civil</Label>
                <Input
                  id="identidade"
                  value={character.identidade}
                  onChange={(e) => updateBasicInfo('identidade', e.target.value)}
                  placeholder="Ex: Peter Parker"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="identidade-secreta"
                  checked={character.identidadeSecreta}
                  onCheckedChange={(checked) => updateBasicInfo('identidadeSecreta', checked)}
                />
                <Label htmlFor="identidade-secreta">Identidade Secreta</Label>
                <InfoIcon content="Marque se a identidade civil do herói é mantida em segredo." />
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="genero">Gênero</Label>
                <Input
                  id="genero"
                  value={character.genero}
                  onChange={(e) => updateBasicInfo('genero', e.target.value)}
                  placeholder="Ex: Masculino"
                />
              </div>

              <div>
                <Label htmlFor="idade">Idade</Label>
                <Input
                  id="idade"
                  value={character.idade}
                  onChange={(e) => updateBasicInfo('idade', e.target.value)}
                  placeholder="Ex: 25 anos"
                />
              </div>

              <div>
                <Label htmlFor="altura">Altura</Label>
                <Input
                  id="altura"
                  value={character.altura}
                  onChange={(e) => updateBasicInfo('altura', e.target.value)}
                  placeholder="Ex: 1,75m"
                />
              </div>

              <div>
                <Label htmlFor="peso">Peso</Label>
                <Input
                  id="peso"
                  value={character.peso}
                  onChange={(e) => updateBasicInfo('peso', e.target.value)}
                  placeholder="Ex: 70kg"
                />
              </div>
            </div>

            {/* Coluna 3 */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="olhos">Cor dos Olhos</Label>
                <Input
                  id="olhos"
                  value={character.olhos}
                  onChange={(e) => updateBasicInfo('olhos', e.target.value)}
                  placeholder="Ex: Castanhos"
                />
              </div>

              <div>
                <Label htmlFor="cabelos">Cor dos Cabelos</Label>
                <Input
                  id="cabelos"
                  value={character.cabelos}
                  onChange={(e) => updateBasicInfo('cabelos', e.target.value)}
                  placeholder="Ex: Pretos"
                />
              </div>

              <div>
                <Label htmlFor="grupo-afiliado">Grupo Afiliado</Label>
                <Input
                  id="grupo-afiliado"
                  value={character.grupoAfiliado}
                  onChange={(e) => updateBasicInfo('grupoAfiliado', e.target.value)}
                  placeholder="Ex: Vingadores"
                />
              </div>

              <div>
                <Label htmlFor="base-operacoes">Base de Operações</Label>
                <Input
                  id="base-operacoes"
                  value={character.baseOperacoes}
                  onChange={(e) => updateBasicInfo('baseOperacoes', e.target.value)}
                  placeholder="Ex: Nova York"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Imagem do Personagem */}
        <Card>
          <CardHeader>
            <CardTitle>Imagem do Personagem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Personagem"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImagePreview(null);
                      dispatch({ type: actions.SET_CHARACTER_IMAGE, payload: null });
                    }}
                  >
                    Remover
                  </Button>
                </div>
              ) : (
                <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">Nenhuma imagem selecionada</p>
                  </div>
                </div>
              )}
              
              <div>
                <input
                  type="file"
                  id="character-image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('character-image').click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {imagePreview ? 'Alterar Imagem' : 'Adicionar Imagem'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sistema de Pontos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Sistema de Pontos
              <InfoIcon content="O sistema de pontos determina quantos recursos você pode gastar na criação do personagem. O padrão é 15 pontos por nível de poder." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nivel-poder">Nível de Poder</Label>
                  <Input
                    id="nivel-poder"
                    type="number"
                    min="1"
                    max="20"
                    value={character.nivelPoder}
                    onChange={(e) => dispatch({
                      type: actions.UPDATE_POWER_LEVEL,
                      payload: parseInt(e.target.value) || 10
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="pontos-heroicos">Pontos Heroicos</Label>
                  <Input
                    id="pontos-heroicos"
                    type="number"
                    min="0"
                    value={character.pontosHeroicos}
                    onChange={(e) => updateBasicInfo('pontosHeroicos', parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-blue-800">Total de Pontos:</div>
                    <div className="text-xl font-bold text-blue-600">{totalPoints}</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-800">Pontos Restantes:</div>
                    <div className={`text-xl font-bold ${remainingPoints < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {remainingPoints}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={addExtraPoints}
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Pontos Extras
                  </Button>
                  
                  {character.pontosPoderExtras > 0 && (
                    <Button
                      onClick={removeExtraPoints}
                      variant="outline"
                      className="w-full"
                    >
                      Remover Pontos Extras
                    </Button>
                  )}
                </div>
                
                {character.pontosPoderExtras > 0 && (
                  <div className="text-sm text-green-600 text-center">
                    +{character.pontosPoderExtras} pontos extras adicionados pelo mestre
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Descrição e Notas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle>Descrição do Personagem</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={character.desenho}
              onChange={(e) => updateBasicInfo('desenho', e.target.value)}
              placeholder="Descreva a aparência, personalidade e história do seu personagem..."
              rows={6}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notas e Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={character.notas}
              onChange={(e) => updateBasicInfo('notas', e.target.value)}
              placeholder="Anotações sobre o personagem, regras especiais, etc..."
              rows={6}
            />
          </CardContent>
        </Card>
      </div>

      {/* Informações de Campanha */}
      <Card>
        <CardHeader>
          <CardTitle>Informações de Campanha</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="serie">Série/Campanha</Label>
              <Input
                id="serie"
                value={character.serie}
                onChange={(e) => updateBasicInfo('serie', e.target.value)}
                placeholder="Nome da campanha ou série"
              />
            </div>

            <div>
              <Label htmlFor="mestre">Mestre</Label>
              <Input
                id="mestre"
                value={character.mestre}
                onChange={(e) => updateBasicInfo('mestre', e.target.value)}
                placeholder="Nome do mestre/narrador"
              />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="informacoes">Informações Adicionais</Label>
            <Textarea
              id="informacoes"
              value={character.informacoes}
              onChange={(e) => updateBasicInfo('informacoes', e.target.value)}
              placeholder="Informações específicas da campanha, regras da casa, etc..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInfoSection;
