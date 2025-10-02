import { Aeronave } from './Aeronave';
import fs from 'fs';
import path from 'path';

export class Relatorio {
    constructor(
        public aeronave: Aeronave,
        public nomeCliente: string,
        public dataEntrega: Date
    ) {}

    gerarRelatorio(): string {
        let relatorio = '=== RELATÓRIO FINAL DA AERONAVE ===\n\n';
        
        // Dados da aeronave
        relatorio += 'DADOS DA AERONAVE:\n';
        relatorio += `Código: ${this.aeronave.codigo}\n`;
        relatorio += `Modelo: ${this.aeronave.modelo}\n`;
        relatorio += `Tipo: ${this.aeronave.tipo}\n`;
        relatorio += `Capacidade: ${this.aeronave.capacidade} passageiros\n`;
        relatorio += `Alcance: ${this.aeronave.alcance} km\n\n`;
        
        // Dados do cliente e entrega
        relatorio += 'DADOS DA ENTREGA:\n';
        relatorio += `Cliente: ${this.nomeCliente}\n`;
        relatorio += `Data de Entrega: ${this.dataEntrega.toLocaleDateString()}\n\n`;
        
        // Peças utilizadas
        relatorio += `PEÇAS UTILIZADAS (${this.aeronave.pecas.length}):\n`;
        if (this.aeronave.pecas.length > 0) {
            this.aeronave.pecas.forEach((peca, index) => {
                relatorio += `${index + 1}. ${peca.getNome} - ${peca.getTipo} - ${peca.getFornecedor} - ${peca.getStatus}\n`;
            });
        } else {
            relatorio += '   Nenhuma peça associada\n';
        }
        relatorio += '\n';
        
        // Etapas realizadas
        relatorio += `ETAPAS REALIZADAS (${this.aeronave.etapas.length}):\n`;
        if (this.aeronave.etapas.length > 0) {
            this.aeronave.etapas.forEach((etapa, index) => {
                relatorio += `${index + 1}. ${etapa.nome} - Prazo: ${etapa.prazo.toLocaleDateString()} - Status: ${etapa.status}\n`;
            });
        } else {
            relatorio += '   Nenhuma etapa associada\n';
        }
        relatorio += '\n';
        
        // Resultados dos testes
        relatorio += `RESULTADOS DOS TESTES (${this.aeronave.testes.length}):\n`;
        if (this.aeronave.testes.length > 0) {
            this.aeronave.testes.forEach((teste, index) => {
                relatorio += `${index + 1}. ${teste.tipo} - Resultado: ${teste.resultado}\n`;
            });
        } else {
            relatorio += '   Nenhum teste realizado\n';
        }

        relatorio += '\n=== FIM DO RELATÓRIO ===';

        return relatorio;
    }

    salvarEmArquivo(): void {
        try {
            const dataDir = 'data';
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const nomeArquivo = `relatorio_${this.aeronave.codigo}_${timestamp}.txt`;
            const relatorioTexto = this.gerarRelatorio();
            
            fs.writeFileSync(path.join(dataDir, nomeArquivo), relatorioTexto);
            console.log(`✅ Relatório salvo em: data/${nomeArquivo}`);
        } catch (error) {
            console.error('❌ Erro ao salvar relatório:', error);
        }
    }
}