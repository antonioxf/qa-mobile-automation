const path = require('path');
const BasePage = require('./pageobjects/base.page');

exports.config = {
    // Força o runner a rodar no processo principal, evitando o worker ESM que quebra no Node novo
    runner: 'local',
    
    // Desativa a compilação automática que chama o ts-node/esm problemático
    autoCompileOpts: {
        autoCompile: false
    },

    specs: [
        './tests/specs/mobile.spec.js'
    ],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'AndroidDevice',
        'appium:app': path.join(process.cwd(), './app/app-debug.apk'),
        'appium:noReset': false,
    }],
    services: ['appium'],
    appium: {
        command: 'appium',
    },
    logLevel: 'info',
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    // Executado uma única vez antes de toda a suíte rodar
    onPrepare: function (config, capabilities) {
        console.log('Executando limpeza de evidências com mais de 7 dias...');
        BasePage.limparEvidenciasAntigas();
    },

    // Executado antes de cada teste individual (It)
    beforeTest: function (test, context) {
        BasePage.resetarContador();
    },

    // Hook executado ao término de cada teste para definir se salvou em Passed ou Failed
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        const statusPasta = passed ? 'Passed' : 'Failed';
        
        // Se o teste falhou, tiramos um print final de erro na pasta Failed
        if (!passed) {
            const basePageInstance = new BasePage();
            await basePageInstance.takeScreenshot(`FALHA_NO_TESTE_${test.title}`, 'Failed');
        }
    },
};