## Tutorial: Como Rodar o Projeto Localmente no VS Code

Este tutorial irá guiá-lo através do processo de configurar e rodar o projeto da Ficha de Personagem de Mutantes & Malfeitores localmente em seu ambiente de desenvolvimento, utilizando o VS Code.

### 1. Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados em sua máquina:

*   **Node.js**: Versão 18 ou superior. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).
*   **pnpm**: Um gerenciador de pacotes rápido e eficiente. Se você não o tem, pode instalá-lo via npm:
    ```bash
    npm install -g pnpm
    ```
*   **Visual Studio Code (VS Code)**: Um editor de código-fonte gratuito e poderoso. Baixe-o em [code.visualstudio.com](https://code.visualstudio.com/).

### 2. Obter o Código-Fonte

Assumindo que você já tem o código-fonte do projeto (por exemplo, via um arquivo ZIP ou um repositório Git):

1.  **Abra o VS Code.**
2.  Vá em `File > Open Folder...` (ou `Arquivo > Abrir Pasta...`).
3.  Navegue até a pasta raiz do projeto (`mutantes-malfeitores-ficha`) e clique em `Open` (Abrir).

### 3. Instalar Dependências

Com o projeto aberto no VS Code:

1.  **Abra o Terminal Integrado** no VS Code. Você pode fazer isso indo em `Terminal > New Terminal` (ou `Terminal > Novo Terminal`) ou usando o atalho `Ctrl + Shift + ` (crase).
2.  No terminal, certifique-se de que você está no diretório raiz do projeto (`/home/ubuntu/mutantes-malfeitores-ficha`).
3.  Execute o seguinte comando para instalar todas as dependências do projeto:
    ```bash
    pnpm install
    ```
    Este comando irá baixar e instalar todas as bibliotecas e pacotes necessários para o funcionamento da aplicação.

### 4. Configurar o Firebase (Opcional, mas Recomendado)

Para que o sistema de login e salvamento de fichas funcione, você precisará configurar seu próprio projeto Firebase. Se você não fizer isso, a aplicação funcionará, mas sem as funcionalidades de autenticação e persistência de dados em nuvem.

1.  **Crie um Projeto Firebase:**
    *   Acesse o [Firebase Console](https://console.firebase.google.com/).
    *   Clique em "Adicionar projeto" ou "Criar um projeto".
    *   Siga as instruções para criar seu novo projeto.

2.  **Configure a Autenticação:**
    *   No Firebase Console do seu projeto, vá para a seção "Build" (Construir) > "Authentication" (Autenticação).
    *   Clique em "Get started" (Começar).
    *   Na aba "Sign-in method" (Método de login), habilite "Email/Password" e "Google" (se desejar login com Google).

3.  **Configure o Firestore Database:**
    *   No Firebase Console, vá para a seção "Build" (Construir) > "Firestore Database".
    *   Clique em "Create database" (Criar banco de dados).
    *   Escolha "Start in test mode" (Iniciar no modo de teste) para facilitar o desenvolvimento. Você pode ajustar as regras de segurança posteriormente.
    *   Selecione a localização do seu servidor.

4.  **Obtenha as Credenciais do seu Aplicativo Web:**
    *   No Firebase Console, na visão geral do seu projeto, clique no ícone `</>` (Web) para adicionar um aplicativo web.
    *   Registre seu aplicativo e copie as configurações do Firebase (um objeto JavaScript com `apiKey`, `authDomain`, `projectId`, etc.).

5.  **Atualize o Arquivo de Configuração no Projeto:**
    *   No seu projeto VS Code, abra o arquivo `src/config/firebase.js`.
    *   Substitua o objeto `firebaseConfig` existente pelas credenciais que você obteve do Firebase Console.

    ```javascript
    // src/config/firebase.js
    import { initializeApp } from 'firebase/app';
    import { getAuth } from 'firebase/auth';
    import { getFirestore } from 'firebase/firestore';

    const firebaseConfig = {
      apiKey: "SUA_API_KEY",
      authDomain: "SEU_AUTH_DOMAIN",
      projectId: "SEU_PROJECT_ID",
      storageBucket: "SEU_STORAGE_BUCKET",
      messagingSenderId: "SEU_MESSAGING_SENDER_ID",
      appId: "SEU_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    ```
    **Lembre-se de substituir os valores de placeholder (`SUA_API_KEY`, etc.) pelos seus próprios!**

### 5. Rodar o Servidor de Desenvolvimento

Após instalar as dependências e configurar o Firebase:

1.  No terminal integrado do VS Code, execute o seguinte comando:
    ```bash
    pnpm run dev
    ```
2.  O terminal irá mostrar uma mensagem indicando que o servidor de desenvolvimento foi iniciado e o endereço onde a aplicação está rodando (geralmente `http://localhost:5173`).
3.  Abra seu navegador web e acesse o endereço fornecido.

Agora você deve ver a aplicação da Ficha de Personagem de Mutantes & Malfeitores rodando localmente em seu navegador, com todas as funcionalidades implementadas e as correções aplicadas.

### 6. Dicas para Desenvolvimento no VS Code

*   **Extensões:** Considere instalar extensões como "ESLint" e "Prettier" para manter a qualidade e formatação do código.
*   **Depuração:** O VS Code possui excelentes ferramentas de depuração para aplicações React. Você pode configurar pontos de interrupção e inspecionar o estado da aplicação.
*   **Git Integration:** Se você estiver usando Git, o VS Code tem integração nativa que facilita o controle de versão.

Se tiver qualquer problema, verifique o terminal do VS Code para mensagens de erro e consulte a documentação oficial do React, Vite e Firebase. Boa sorte!
