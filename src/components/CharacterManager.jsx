import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Download, 
  Upload,
  User,
  Zap,
  Shield
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCharacter } from '../contexts/CharacterContext';

const CharacterManager = ({ isOpen, onClose, onSelectCharacter }) => {
  const { currentUser, saveCharacter, loadUserCharacters } = useAuth();
  const { character, dispatch, actions } = useCharacter();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [characterName, setCharacterName] = useState('');

  useEffect(() => {
    if (isOpen && currentUser) {
      loadCharacters();
    }
  }, [isOpen, currentUser]);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      const userCharacters = await loadUserCharacters();
      
      // ADICIONE ESTA LINHA PARA INVESTIGAR:
      console.log('Personagens recebidos do Firebase:', userCharacters);
      
      setCharacters(userCharacters);
    } catch (error) {
      setError('Erro ao carregar personagens');
      console.error('Erro ao carregar personagens:', error);
    } finally {
      setLoading(false);
    }
  };

const handleSaveCharacter = async () => {
    if (!characterName.trim()) {
      setError('Por favor, digite um nome para o personagem');
      return;
    }

    setLoading(true); // Inicia o carregamento
    try {
      const characterToSave = {
        ...character,
        name: characterName,
        heroi: characterName
      };
      
      await saveCharacter(characterToSave); // Tenta salvar
      await loadCharacters(); // Recarrega a lista
      setSaveDialogOpen(false);
      setCharacterName('');
      setError('');
    } catch (error) {
      setError('Erro ao salvar personagem. Verifique sua conexão ou tente mais tarde.');
      console.error('Erro ao salvar personagem:', error);
    } finally {
      setLoading(false); // PARA O CARREGAMENTO AQUI!
    }
  };

  const handleLoadCharacter = (selectedCharacter) => {
    dispatch({
      type: actions.LOAD_CHARACTER,
      payload: selectedCharacter
    });
    onSelectCharacter(selectedCharacter);
    onClose();
  };

  const handleDeleteCharacter = async (characterId) => {
    if (!confirm('Tem certeza que deseja excluir este personagem?')) {
      return;
    }

    try {
      setLoading(true);
      // Implementar exclusão no Firebase
      await loadCharacters();
    } catch (error) {
      setError('Erro ao excluir personagem');
      console.error('Erro ao excluir personagem:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCharacter = (character) => {
    const dataStr = JSON.stringify(character, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${character.heroi || 'personagem'}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportCharacter = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedCharacter = JSON.parse(e.target.result);
          dispatch({
            type: actions.LOAD_CHARACTER,
            payload: importedCharacter
          });
          onClose();
        } catch (error) {
          setError('Erro ao importar personagem. Arquivo inválido.');
        }
      };
      reader.readAsText(file);
    }
  };

  const openSaveDialog = () => {
    setCharacterName(character.heroi || '');
    setSaveDialogOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Gerenciar Personagens
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Ações */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={openSaveDialog} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar Atual
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleExportCharacter(character)}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Exportar Atual
              </Button>

              <div>
                <input
                  type="file"
                  id="import-character"
                  accept=".json"
                  onChange={handleImportCharacter}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('import-character').click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Importar
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={loadCharacters}
                disabled={loading}
                className="flex items-center gap-2"
              >
                Atualizar
              </Button>
            </div>

            {/* Lista de Personagens */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Seus Personagens</h3>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Carregando personagens...</p>
                </div>
              ) : characters.length === 0 ? (
                <div className="text-center py-8">
                  <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-600">Nenhum personagem salvo</p>
                  <p className="text-sm text-gray-500">Crie um personagem e clique em "Salvar Atual"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {characters.map((char, index) => (
                    <Card key={char.id || index} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {char.heroi || char.name || 'Sem Nome'}
                        </CardTitle>
                        {char.identidade && (
                          <p className="text-sm text-gray-600">{char.identidade}</p>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Zap className="w-3 h-3 text-purple-600" />
                            <span>Nível {char.nivelPoder || 10}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Shield className="w-3 h-3 text-blue-600" />
                            <span>{char.poderes?.length || 0} poderes</span>
                          </div>
                          
                          {char.updatedAt && (
                            <p className="text-xs text-gray-500">
                              Atualizado: {new Date(char.updatedAt.seconds * 1000).toLocaleDateString()}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            onClick={() => handleLoadCharacter(char)}
                            className="flex-1"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Carregar
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleExportCharacter(char)}
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteCharacter(char.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para salvar personagem */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Salvar Personagem</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="character-name">Nome do Personagem</Label>
              <Input
                id="character-name"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Digite o nome do personagem"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleSaveCharacter}
                disabled={loading || !characterName.trim()}
                className="flex-1"
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setSaveDialogOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CharacterManager;
