import { Aeronave } from './Aeronave';
import fs from 'fs';

export class Relatorio {
    constructor(
        public aeronave: Aeronave,
        public nomeCliente: string,
        public dataEntrega: Date
    ) {}

    gerarRelatorio(): string {
        let relatorio = '=== RELATÓRIO FINAL DA AERONAVE ===\n\n';
        
        // Dados da aeronave
        relatorio += `DADOS DA AERONAVE:\n`;
        relatorio += `Código: ${this.aeronave.codigo}\n`;
        relatorio += `Modelo: ${this.aeronave.modelo}\n`;
        relatorio += `Tipo: ${this.aeronave.tipo}\n`;
        relatorio += `Capacidade: ${this.aeronave.capacidade}\n`;
        relatorio += `Alcance: ${this.aeronave.alcance} km\n\n`;
        
        // Dados do cliente e entrega
        relatorio += `DADOS DA ENTREGA:\n`;
        relatorio += `Cliente: ${this.nomeCliente}\n`;
        relatorio += `Data de Entrega: ${this.dataEntrega.toLocaleDateString()}\n\n`;
        
        // Peças utilizadas
        relatorio += `PEÇAS UTILIZADAS (${this.aeronave.pecas.length}):\n`;
        this.aeronave.pecas.forEach((peca, index) => {
            relatorio += `${index + 1}. ${peca.getNome} - ${peca.getTipo} - ${peca.getFornecedor} - ${peca.getStatus}\n`;
        });
        relatorio += '\n';
        
        // Etapas realizadas
        relatorio += `ETAPAS REALIZADAS (${this.aeronave.etapas.length}):\n`;
        this.aeronave.etapas.forEach((etapa, index) => {
            relatorio += `${index + 1}. ${etapa.nome} - Prazo: ${etapa.prazo.toLocaleDateString()} - Status: ${etapa.status}\n`;
        });
        relatorio += '\n';
        
        // Resultados dos testes
        relatorio += `RESULTADOS DOS TESTES (${this.aeronave.testes.length}):\n`;
        this.aeronave.testes.forEach((teste, index) => {
            relatorio += `${index + 1}. ${teste.tipo} - Resultado: ${teste.resultado}\n`;
        });

        return relatorio;
    }

    salvarEmArquivo(): void {
        try {
            if (!fs.existsSync('data')) {
                fs.mkdirSync('data');
            }

            const relatorioTexto = this.gerarRelatorio();
            const nomeArquivo = `relatorio_${this.aeronave.codigo}_${Date.now()}.txt`;
            
            fs.writeFileSync(`data/${nomeArquivo}`, relatorioTexto);
            console.log(`✅ Relatório salvo em: data/${nomeArquivo}`);
        } catch (error) {
            console.error('❌ Erro ao salvar relatório:', error);
        }
    }
}