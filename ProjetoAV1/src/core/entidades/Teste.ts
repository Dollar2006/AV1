import { TipoTeste } from '../enums/TipoTeste';
import { ResultadoTeste } from '../enums/ResultadoTeste';
import fs from 'fs';

export class Teste {
    constructor(
        public tipo: TipoTeste,
        public resultado: ResultadoTeste
    ) {}

    salvar(): void {
        try {
            if (!fs.existsSync('data')) {
                fs.mkdirSync('data');
            }

            const dados = {
                tipo: this.tipo,
                resultado: this.resultado,
                data: new Date().toISOString()
            };

            const nomeArquivo = `teste_${this.tipo}_${Date.now()}.json`;
            fs.writeFileSync(`data/${nomeArquivo}`, JSON.stringify(dados, null, 2));
            console.log(`✅ Teste ${this.tipo} salvo com sucesso!`);
        } catch (error) {
            console.error('❌ Erro ao salvar teste:', error);
        }
    }

    carregar(nomeArquivo: string): void {
        try {
            const arquivo = `data/${nomeArquivo}`;
            
            if (fs.existsSync(arquivo)) {
                const dados = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
                
                this.tipo = dados.tipo;
                this.resultado = dados.resultado;
                
                console.log(`✅ Teste ${this.tipo} carregado com sucesso!`);
            } else {
                console.log('❌ Arquivo não encontrado');
            }
        } catch (error) {
            console.error('❌ Erro ao carregar teste:', error);
        }
    }

    executarTeste(): void {
        console.log(`🔧 Executando teste ${this.tipo}...`);
        // Simulação de teste - em sistema real teria lógica específica
        setTimeout(() => {
            console.log(`✅ Teste ${this.tipo} concluído! Resultado: ${this.resultado}`);
        }, 1000);
    }
}