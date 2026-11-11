const path = require('path');
const fs = require('fs');

let stepCounter = 1;
let sessionFolder = null; // Armazena a pasta única da execução atual (ex: Executado em 11-11-2026-16-30-00)

module.exports = class BasePage {

    /**
     * Limpa evidências antigas (com mais de 7 dias) na inicialização
     */
    static limparEvidenciasAntigas() {
        const baseDir = path.join(process.cwd(), './screenshots');
        if (!fs.existsSync(baseDir)) return;

        const agora = Date.now();
        const seteDiasEmMs = 7 * 24 * 60 * 60 * 1000;

        function varrerDiretorio(diretorio) {
            const arquivos = fs.readdirSync(diretorio);
            for (const arquivo of arquivos) {
                const caminhoCompleto = path.join(diretorio, arquivo);
                const stat = fs.statSync(caminhoCompleto);

                if (stat.isDirectory()) {
                    varrerDiretorio(caminhoCompleto);
                } else if (stat.isFile() && arquivo.endsWith('.png')) {
                    const tempoArquivo = stat.mtimeMs;
                    if (agora - tempoArquivo > seteDiasEmMs) {
                        fs.unlinkSync(caminhoCompleto);
                        console.log(`[Expurgo 7 dias]: Evidência antiga removida -> ${arquivo}`);
                    }
                }
            }
        }

        varrerDiretorio(baseDir);
    }

    /**
     * Inicializa a pasta de execução baseada no timestamp atual (dd-MM-yyyy-hh-mm-ss)
     */
    static inicializarPastaSessao() {
        const agora = new Date();
        const dia = String(agora.getDate()).padStart(2, '0');
        const mes = String(agora.getMonth() + 1).padStart(2, '0');
        const ano = agora.getFullYear();
        const hora = String(agora.getHours()).padStart(2, '0');
        const min = String(agora.getMinutes()).padStart(2, '0');
        const seg = String(agora.getSeconds()).padStart(2, '0');

        sessionFolder = `Executado em ${dia}-${mes}-${ano}-${hora}-${min}-${seg}`;
        stepCounter = 1;
    }

    /**
     * Reseta o contador incremental no início de cada teste
     */
    static resetarContador() {
        stepCounter = 1;
    }

    /**
     * Tira o print incremental e salva dentro de Passed ou Failed -> Pasta com Data/Hora
     */
    async takeScreenshot(stepName, status = 'Passed') {
        try {
            if (!sessionFolder) {
                BasePage.inicializarPastaSessao();
            }

            // Caminho final: screenshots / Passed (ou Failed) / Executado em dd-MM-yyyy-hh-mm-ss
            const pastaDestino = path.join(process.cwd(), './screenshots', status, sessionFolder);
            if (!fs.existsSync(pastaDestino)) {
                fs.mkdirSync(pastaDestino, { recursive: true });
            }

            // Formato: "1 - nome_da_acao.png"
            const nomeFormatado = `${stepCounter} - ${stepName.replace(/\s+/g, '_')}.png`;
            const filePath = path.join(pastaDestino, nomeFormatado);
            
            await browser.saveScreenshot(filePath);
            console.log(`[Evidência Salva]: ${filePath}`);

            stepCounter++;
        } catch (error) {
            console.log(`[Aviso]: Não foi possível salvar o print para o passo "${stepName}"`, error);
        }
    }
}