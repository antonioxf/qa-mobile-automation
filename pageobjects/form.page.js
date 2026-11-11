const BasePage = require('./base.page');

class FormPage extends BasePage {
    // Seletores
    get inputName() { return $('~input-name'); }
    get inputEmail() { return $('~input-email'); }
    get btnSubmit() { return $('~btn-submit-form'); }
    get successMsg() { return $('~success-message'); }

    // Ações com evidências embutidas
    async preencherFormulario(nome, email) {
        await this.inputName.setValue(nome);
        await this.takeScreenshot('preencheu_nome');

        await this.inputEmail.setValue(email);
        await this.takeScreenshot('preencheu_email');

        await this.btnSubmit.click();
        await this.takeScreenshot('enviou_formulario');
    }

    async validarSucessoEnvio() {
        await expect(this.successMsg).toBeDisplayed();
        const textoSucesso = await this.successMsg.getText();
        await expect(textoSucesso).toEqual('Dados enviados com sucesso!');
        await this.takeScreenshot('validou_sucesso_envio');
    }
}

module.exports = new FormPage();