const LoginPage = require('../../pageobjects/login.page');
const FormPage = require('../../pageobjects/form.page');

describe('QA Mobile Test Suite - Appium & WebdriverIO', () => {

    it('Tarefa 1: Deve realizar login, navegar pelas telas e validar elemento de status', async () => {
        // 1. Preenchendo credenciais e logando
        await LoginPage.realizarLogin('admin', '123456');

        // 2. Validando mensagem de boas-vindas no Dashboard
        await LoginPage.validarDashboard();

        // 3. Navegando para a tela de Detalhes
        await LoginPage.irParaDetalhes();

        // 4. Validando o elemento na tela de Detalhes e status do servidor
        await LoginPage.validarStatusServidor();

        // 5. Retornando ao dashboard para manter o fluxo limpo
        await LoginPage.retornarAoDashboard();
    });

    it('Tarefa 2: Deve navegar para o formulário, preencher os dados e enviar com sucesso', async () => {
        // 1. A partir do dashboard, navegar para o formulário
        await LoginPage.irParaFormulario();

        // 2. Preenchendo o formulário de cadastro
        await FormPage.preencherFormulario('Antonio QA Specialist', 'antonio.qa@automation.com');

        // 3. Validando a mensagem de sucesso do envio
        await FormPage.validarSucessoEnvio();
    });

});