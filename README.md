# 🚀 Suite de Automação de Testes Mobile (Appium + WebdriverIO)

Suite de testes automatizados E2E para aplicativos móveis Android desenvolvida com **WebdriverIO** e **Appium 3.x**, estruturada sob o padrão **Page Object Model (POM)** e equipada com geração automática de evidências visuais organizadas por status e linha do tempo.

---

## 📂 Arquitetura / Estrutura de Pastas

O projeto segue uma arquitetura limpa, desacoplada e de fácil manutenção, separando as interações de tela das especificações de teste:

```text
qa-mobile-automation/
├── app/
│   └── app-debug.apk             # APK alvo dos testes automatizados criado para não necessitar de apks externas
├── pageobjects/
│   ├── base.page.js              # Classe base (gerencia prints incrementais, datas e expurgo)
│   ├── login.page.js             # Mapeamento e ações da tela de Login / Dashboard
│   └── form.page.js              # Mapeamento e ações do fluxo de Formulários
├── screenshots/                  # Relatório visual de evidências (Gerenciado automaticamente)
│   ├── Passed/                   # Prints de testes bem-sucedidos (com pasta por timestamp)
│   └── Failed/                   # Prints de falhas capturados em tempo de execução
├── tests/
│   └── specs/
│       └── mobile.spec.js        # Casos de teste end-to-end (Mocha BDD)
├── package.json                  # Dependências, scripts e metadados do projeto
└── README.md                     # Documentação oficial da suíte
```
## 🛠️ Versões Utilizadas
Para garantir a total compatibilidade e evitar conflitos de dependências nativas (undici / ganchos ESM), a suíte roda sob a seguinte stack tecnológica:

**Sistema Operacional:** Windows 10 / 11 (PowerShell)

**Node.js:** v22.x ou superior (Recomendado via nvm-windows)

**NPM:** v10.x+

**Appium Server:** v3.x

**Driver Appium:** uiautomator2

**WebdriverIO:** v9.x / v10  .x

**Android SDK:** API 30+ (Android 11+)

## ⚙️ Configuração de Variáveis de Ambiente
Para que o Appium e o WebdriverIO consigam interagir com as ferramentas de compilação e o emulador do Android, a variável de sistema ANDROID_HOME deve estar devidamente configurada na sua máquina.

1. Pressione a tecla **Windows**, digite **"Variáveis de ambiente"** e abra as Variáveis de Ambiente do Sistema.

2. Em **Variáveis de Usuário**, clique em **Nova...** e adicione:

   **Nome da variável:** ANDROID_HOME

   **Valor da variável:** C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk (Ajuste para o caminho exato do seu SDK)

3. Reinicie o seu terminal (PowerShell / VS Code) para que o sistema carregue o PATH atualizado.

## 📦 Dependências (Como Instalar)
Caso esteja clonando o repositório ou configurando a máquina pela primeira vez, siga os passos abaixo no terminal dentro da raiz do projeto (C:\Projects\qa-mobile-automation):

**1. Permitir a execução de scripts no PowerShell (se necessário):**
```text
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
**2. Instalar as dependências do projeto:**
```text
npm install
```
**3. Instalar o driver oficial do UiAutomator2 para o Appium 3.x:**
```text
npx appium driver install uiautomator2
```
## ▶️ Como Executar os Testes e Gerar o Relatório
Com o emulador Android aberto (ou dispositivo físico conectado via USB com a depuração USB ativa), execute o comando principal:
```text
npm test
```
## 📊 Relatório e Evidências Visuais
Durante e após a execução, a automação gerará automaticamente:

**Limpeza Inteligente:** Expurgo automático de evidências com mais de 7 dias na inicialização (onPrepare).

**Contador Incremental:** Capturas de tela sequenciais renomeadas no formato 1 - nome_da_acao.png, 2 - nome_da_acao.png, etc.

**Organização Cronológica:** Os prints bem-sucedidos ou com falha serão salvos em diretórios estruturados com o carimbo exato da execução:
```text
screenshots/
└── Passed/
    └── Executado em 11-11-2026-18-30-00/
        ├── 1 - preencheu_usuario.png
        ├── 2 - preencheu_senha.png
        └── 3 - clicou_login.png
```
