const BasePage = require('./base.page');

class LoginPage extends BasePage {
    // Seletores
    get userInput() { return $('~input-username'); }
    get passInput() { return $('~input-password'); }
    get btnLogin() { return $('~btn-login'); }
    get welcomeText() { return $('~welcome-message'); }
    get btnGoDetails() { return $('~btn-go-details'); }
    get serverStatus() { return $('~server-status-label'); }
    get btnBack() { return $('~btn-back-dashboard'); }
    get btnGoForm() { return $('~btn-go-form'); }

    // Ações com evidências embutidas
    async realizarLogin(usuario, senha) {
        await this.userInput.setValue(usuario);
        await this.takeScreenshot('preencheu_usuario');
        
        await this.passInput.setValue(senha);
        await this.takeScreenshot('preencheu_senha');
        
        await this.btnLogin.click();
        await this.takeScreenshot('clicou_login');
    }

    async validarDashboard() {
        await expect(this.welcomeText).toBeDisplayed();
        await this.takeScreenshot('validou_dashboard');
    }

    async irParaDetalhes() {
        await this.btnGoDetails.click();
        await this.takeScreenshot('clicou_ir_para_detalhes');
    }

    async validarStatusServidor() {
        await expect(this.serverStatus).toBeDisplayed();
        const statusText = await this.serverStatus.getText();
        await expect(statusText).toEqual('Status do Servidor: Online e Estável');
        await this.takeScreenshot('validou_status_servidor');
    }

    async retornarAoDashboard() {
        await this.btnBack.click();
        await this.takeScreenshot('retornou_ao_dashboard');
    }

    async irParaFormulario() {
        await this.btnGoForm.click();
        await this.takeScreenshot('clicou_ir_para_formulario');
    }
}

module.exports = new LoginPage();