# Sistema de Ficha de Personagem - Mutantes & Malfeitores

## 📋 Visão Geral

Este é um sistema completo de criação e gerenciamento de fichas de personagem para o RPG **Mutantes & Malfeitores 3ª Edição**. O sistema oferece duas interfaces principais:

- **Modo Criação**: Para criar e editar personagens
- **Modo Sessão**: Interface otimizada para uso durante o jogo

## ✨ Funcionalidades Implementadas

### 🎯 Sistema de Pontos Automático
- ✅ Cálculo automático de pontos gastos
- ✅ Limite de pontos por nível de poder (15 pontos × nível)
- ✅ Gráfico de rosca mostrando distribuição de pontos
- ✅ Sistema de pontos extras (adicionados pelo mestre)
- ✅ Validação de limites - impede gastar mais pontos que o disponível

### 👤 Atributos
- ✅ 8 atributos principais (Força, Agilidade, Luta, Prontidão, Vigor, Destreza, Intelecto, Presença)
- ✅ Cálculo automático de modificadores
- ✅ Tooltips informativos ao clicar
- ✅ Limites de pontos por atributo
- ✅ Interface visual com botões +/- e entrada manual

### 🛡️ Defesas
- ✅ 5 defesas (Esquiva, Aparar, Fortitude, Resistência, Vontade)
- ✅ Cálculo automático baseado em atributos
- ✅ Possibilidade de adicionar bônus extras
- ✅ Explicações sobre defesas ativas vs. resistência

### 📚 Perícias
- ✅ Lista completa de perícias do M&M 3E
- ✅ Dropdown com perícias padrão + opção personalizada
- ✅ Cálculo automático (atributo base + graduações)
- ✅ Sistema de especialização
- ✅ Tooltips explicativos

### ⚡ Sistema de Poderes Complexo
- ✅ Efeitos base do livro (Blast, Flight, Protection, etc.)
- ✅ Sistema de extras e complicações
- ✅ Cálculo automático de custo
- ✅ Seleção de ícones para poderes
- ✅ Descrições detalhadas
- ✅ Combinações de efeitos

### 🌟 Vantagens e Complicações
- ✅ Dropdown com vantagens comuns do M&M
- ✅ Dropdown com complicações comuns
- ✅ Opção de criar vantagens/complicações personalizadas
- ✅ Cálculo automático de pontos

### 🎮 Modo Sessão
- ✅ Interface otimizada para uso durante o jogo
- ✅ Modificadores claramente visíveis
- ✅ Sistema de rolagem de dados (clique para rolar 1d20 + modificador)
- ✅ Gerenciamento de pontos heroicos
- ✅ Sistema de condições temporárias
- ✅ Informações de combate (iniciativa, ataques)
- ✅ Visualização de poderes com regras de uso

### 🖼️ Personalização Visual
- ✅ Upload de imagem do personagem
- ✅ Seleção de ícones para poderes
- ✅ Interface moderna e responsiva
- ✅ Tooltips informativos em todos os elementos

### 🔐 Sistema de Autenticação (Firebase)
- ✅ Login com email/senha
- ✅ Login com Google
- ✅ Registro de novos usuários
- ✅ Recuperação de senha
- ✅ Gerenciamento de sessão

### 💾 Gerenciamento de Personagens
- ✅ Salvar personagens na nuvem (Firebase)
- ✅ Carregar personagens salvos
- ✅ Exportar personagem (JSON)
- ✅ Importar personagem (JSON)
- ✅ Lista de personagens do usuário

## 🎯 Como Usar

### Criação de Personagem

1. **Informações Básicas**: Preencha nome, identidade, aparência, etc.
2. **Atributos**: Distribua pontos nos 8 atributos principais
3. **Defesas**: Ajuste as defesas conforme necessário
4. **Perícias**: Selecione e gradua as perícias desejadas
5. **Poderes**: Crie poderes complexos com efeitos, extras e complicações
6. **Vantagens/Complicações**: Adicione vantagens e complicações

### Modo Sessão

1. Clique em **"Modo Sessão"** no canto superior direito
2. **Rolagens**: Clique em qualquer atributo, perícia ou defesa para rolar 1d20
3. **Pontos Heroicos**: Use os botões +/- para gerenciar
4. **Condições**: Adicione condições temporárias (atordoado, ferido, etc.)
5. **Combate**: Use as informações de iniciativa e ataques

### Sistema de Login

1. Clique em **"Entrar"** no canto superior direito
2. **Login**: Use email/senha ou Google
3. **Registro**: Crie uma nova conta
4. **Personagens**: Acesse seus personagens salvos via botão "Personagens"

## 🔧 Configuração do Firebase

Para usar o sistema de autenticação, você precisa configurar o Firebase:

### 1. Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Criar projeto"
3. Siga o assistente de criação

### 2. Configurar Authentication

1. No painel do Firebase, vá em **Authentication**
2. Clique em **"Começar"**
3. Na aba **"Sign-in method"**, habilite:
   - Email/Password
   - Google (opcional)

### 3. Configurar Firestore

1. No painel do Firebase, vá em **Firestore Database**
2. Clique em **"Criar banco de dados"**
3. Escolha modo de teste (para desenvolvimento)
4. Selecione uma localização

### 4. Obter Configurações

1. Vá em **Configurações do projeto** (ícone de engrenagem)
2. Na seção **"Seus apps"**, clique em **"Adicionar app"** → Web
3. Registre o app e copie as configurações

### 5. Atualizar Configuração

Edite o arquivo `src/config/firebase.js` e substitua as configurações:

```javascript
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "seu-app-id"
};
```

## 🚀 Deploy no Netlify

### 1. Build do Projeto

```bash
pnpm run build
```

### 2. Deploy Manual

1. Acesse [Netlify](https://www.netlify.com/)
2. Arraste a pasta `dist` para o deploy
3. Configure domínio personalizado (opcional)

### 3. Deploy Automático (Recomendado)

1. Conecte seu repositório GitHub ao Netlify
2. Configure build settings:
   - **Build command**: `pnpm run build`
   - **Publish directory**: `dist`
3. Configure variáveis de ambiente (se necessário)

## 📱 Recursos Responsivos

O sistema é totalmente responsivo e funciona em:
- 💻 Desktop
- 📱 Tablets
- 📱 Smartphones

## 🎨 Tecnologias Utilizadas

- **React 19** - Framework principal
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones
- **Recharts** - Gráficos
- **Firebase** - Autenticação e banco de dados
- **Netlify** - Hospedagem

## 📖 Referências

- [Mutantes & Malfeitores 3ª Edição](https://www.jambo.com.br/produto/mutantes-malfeitores-3a-edicao-livro-basico/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

## 🐛 Solução de Problemas

### Firebase não conecta
- Verifique se as configurações estão corretas
- Certifique-se de que Authentication e Firestore estão habilitados
- Verifique as regras de segurança do Firestore

### Build falha
- Execute `pnpm install` para instalar dependências
- Verifique se todas as importações estão corretas
- Limpe o cache com `pnpm run dev --force`

### Personagens não salvam
- Verifique se está logado
- Confirme se o Firestore está configurado
- Verifique as regras de segurança do banco

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação acima
2. Consulte os logs do console do navegador
3. Verifique a configuração do Firebase
4. Teste em modo incógnito para descartar problemas de cache
