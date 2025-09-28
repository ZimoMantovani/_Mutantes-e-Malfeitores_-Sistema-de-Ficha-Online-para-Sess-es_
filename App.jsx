import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Shield, 
  BookOpen, 
  Zap, 
  Play, 
  Edit, 
  PieChart,
  Settings,
  Save,
  Upload,
  LogIn,
  LogOut,
  Database
} from 'lucide-react';
import { CharacterProvider } from './contexts/CharacterContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AttributesSection from './components/AttributesSection';
import DefensesSection from './components/DefensesSection';
import SkillsSection from './components/SkillsSection';
import PowersSection from './components/PowersSection';
import SessionMode from './components/SessionMode';
import PointsChart from './components/PointsChart';
import BasicInfoSection from './components/BasicInfoSection';
import AdvantagesSection from './components/AdvantagesSection';
import LoginModal from './components/LoginModal';
import CharacterManager from './components/CharacterManager';
import './App.css';

function AppContent() {
  const { currentUser, logout } = useAuth();
  const [currentMode, setCurrentMode] = useState('creation'); // 'creation' ou 'session'
  const [activeTab, setActiveTab] = useState('basic');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [characterManagerOpen, setCharacterManagerOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentMode === 'session' ? (
        <div>
          {/* Header do Modo Sessão */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Play className="w-6 h-6 text-green-600" />
                Modo Sessão
              </h1>
              <Button
                onClick={() => setCurrentMode('creation')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Editar Ficha
              </Button>
            </div>
          </div>
          
          <SessionMode />
        </div>
      ) : (
        <div>
          {/* Header do Modo Criação */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-800">
                Mutantes & Malfeitores - Ficha de Personagem
              </h1>
              <div className="flex gap-2">
                {currentUser ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setCharacterManagerOpen(true)}
                      className="flex items-center gap-2"
                    >
                      <Database className="w-4 h-4" />
                      Personagens
                    </Button>
                    
                    <Button
                      onClick={() => setCurrentMode('session')}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    >
                      <Play className="w-4 h-4" />
                      Modo Sessão
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      {currentUser.displayName || 'Sair'}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => setCurrentMode('session')}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    >
                      <Play className="w-4 h-4" />
                      Modo Sessão
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => setLoginModalOpen(true)}
                      className="flex items-center gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      Entrar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Coluna Principal - Abas */}
              <div className="lg:col-span-3">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="basic" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Básico
                    </TabsTrigger>
                    <TabsTrigger value="attributes" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Atributos
                    </TabsTrigger>
                    <TabsTrigger value="defenses" className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Defesas
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Perícias
                    </TabsTrigger>
                    <TabsTrigger value="powers" className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Poderes
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-6">
                    <TabsContent value="basic">
                      <BasicInfoSection />
                    </TabsContent>

                    <TabsContent value="attributes">
                      <AttributesSection />
                    </TabsContent>

                    <TabsContent value="defenses">
                      <DefensesSection />
                    </TabsContent>

                    <TabsContent value="skills">
                      <SkillsSection />
                    </TabsContent>

                    <TabsContent value="powers">
                      <PowersSection />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              {/* Sidebar - Gráfico de Pontos e Vantagens/Complicações */}
              <div className="space-y-6">
                <PointsChart />
                <AdvantagesSection />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modais */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
      />
      
      <CharacterManager
        isOpen={characterManagerOpen}
        onClose={() => setCharacterManagerOpen(false)}
        onSelectCharacter={(character) => {
          // Lógica para carregar personagem selecionado
          console.log('Personagem selecionado:', character);
        }}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CharacterProvider>
        <AppContent />
      </CharacterProvider>
    </AuthProvider>
  );
}

export default App;
