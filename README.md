# 🦸‍♂️ Mutantes & Malfeitores - Sistema de Ficha Digital

Um sistema completo de criação e gerenciamento de fichas de personagem para o RPG **Mutantes & Malfeitores 3ª Edição**.

## 🚀 Funcionalidades

- ✅ **Sistema de Pontos Automático** - Cálculo e validação automática
- ✅ **Modo Criação** - Interface completa para criar personagens
- ✅ **Modo Sessão** - Interface otimizada para uso durante o jogo
- ✅ **Sistema de Poderes Complexo** - Efeitos, extras e complicações
- ✅ **Autenticação Firebase** - Login seguro e sincronização na nuvem
- ✅ **Gerenciamento de Personagens** - Salvar, carregar, exportar e importar
- ✅ **Interface Responsiva** - Funciona em desktop, tablet e mobile
- ✅ **Tooltips Informativos** - Ajuda contextual em todos os elementos

## 🎯 Demonstração

![Sistema de Ficha](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Mutantes+%26+Malfeitores)

## 🛠️ Instalação

### Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm

### Passos

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd mutantes-malfeitores-ficha
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Configure o Firebase** (opcional, para autenticação)
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Configure Authentication e Firestore
   - Atualize `src/config/firebase.js` com suas credenciais

4. **Execute em desenvolvimento**
```bash
pnpm run dev
```

5. **Build para produção**
```bash
pnpm run build
```

## 🔧 Configuração do Firebase

Para habilitar login e sincronização na nuvem:

1. **Criar projeto Firebase**
   - Acesse [Firebase Console](https://console.firebase.google.com/)
   - Crie um novo projeto

2. **Configurar serviços**
   - **Authentication**: Habilite Email/Password e Google
   - **Firestore**: Crie banco de dados em modo teste

3. **Obter configurações**
   - Vá em Configurações → Adicionar app Web
   - Copie as configurações

4. **Atualizar código**
   - Edite `src/config/firebase.js`
   - Substitua as configurações de exemplo

```javascript
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  // ... outras configurações
};
```

## 🚀 Deploy no Netlify

### Deploy Manual
```bash
pnpm run build
# Arraste a pasta 'dist' para netlify.com
```

### Deploy Automático
1. Conecte seu repositório GitHub ao Netlify
2. Configure:
   - **Build command**: `pnpm run build`
   - **Publish directory**: `dist`

## 📖 Como Usar

### Criação de Personagem

1. **Informações Básicas**: Nome, identidade, aparência
2. **Atributos**: Distribua pontos nos 8 atributos
3. **Defesas**: Ajuste defesas conforme necessário
4. **Perícias**: Selecione e gradua perícias
5. **Poderes**: Crie poderes com efeitos e modificadores
6. **Vantagens**: Adicione vantagens e complicações

### Modo Sessão

1. Clique em **"Modo Sessão"**
2. **Rolagens**: Clique em atributos/perícias para rolar dados
3. **Pontos Heroicos**: Gerencie com botões +/-
4. **Condições**: Adicione estados temporários
5. **Combate**: Use informações de iniciativa e ataques

## 🎨 Tecnologias

- **React 19** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes UI modernos
- **Lucide React** - Ícones
- **Recharts** - Gráficos e visualizações
- **Firebase** - Autenticação e banco de dados
- **Netlify** - Hospedagem e deploy

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── AttributesSection.jsx
│   ├── PowersSection.jsx
│   ├── SessionMode.jsx
│   └── ...
├── contexts/           # Contextos React
│   ├── AuthContext.jsx
│   └── CharacterContext.jsx
├── config/             # Configurações
│   └── firebase.js
├── data/              # Dados do jogo
│   ├── characterData.js
│   └── powersData.js
└── App.jsx            # Componente principal
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **Jambo Editora** - Pelos excelentes livros de Mutantes & Malfeitores
- **Green Ronin Publishing** - Criadores do sistema M&M
- **Comunidade RPG** - Por manter viva a paixão pelos jogos de mesa

## 📞 Suporte

- 📖 [Documentação Completa](DOCUMENTACAO.md)
- 🐛 [Reportar Bug](../../issues)
- 💡 [Sugerir Feature](../../issues)

---

**Feito com ❤️ para a comunidade RPG brasileira**
