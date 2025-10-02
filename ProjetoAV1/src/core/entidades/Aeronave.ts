import { TipoAeronave } from '../enums/TipoAeronave';
import { Peca } from './Peca';
import { Etapa } from './Etapa';
import { Teste } from './Teste';
import fs from 'fs';

export class Aeronave {
    constructor(
        public codigo: string,
        public modelo: string,
        public tipo: TipoAeronave,
        public capacidade: number,
        public alcance: number,
        public pecas: Peca[] = [],
        public etapas: Etapa[] = [],
        public testes: Teste[] = []
    ) {}

    exibirDetalhes(): void {
        console.log('=== DETALHES DA AERONAVE ===');
        console.log(`Código: ${this.codigo}`);
        console.log(`Modelo: ${this.modelo}`);
        console.log(`Tipo: ${this.tipo}`);
        console.log(`Capacidade: ${this.capacidade} passageiros`);
        console.log(`Alcance: ${this.alcance} km`);
        console.log(`Peças associadas: ${this.pecas.length}`);
        console.log(`Etapas: ${this.etapas.length}`);
        console.log(`Testes: ${this.testes.length}`);
    }

    salvar(): void {
        try {
            if (!fs.existsSync('data')) {
                fs.mkdirSync('data');
            }

            const dados = {
                codigo: this.codigo,
                modelo: this.modelo,
                tipo: this.tipo,
                capacidade: this.capacidade,
                alcance: this.alcance,
                pecas: this.pecas.map(peca => ({
                    nome: peca.getNome,
                    tipo: peca.getTipo,
                    fornecedor: peca.getFornecedor,
                    status: peca.getStatus
                })),
                etapas: this.etapas.map(etapa => ({
                    nome: etapa.nome,
                    prazo: etapa.prazo,
                    status: etapa.status
                })),
                testes: this.testes.map(teste => ({
                    tipo: teste.tipo,
                    resultado: teste.resultado
                }))
            };

            fs.writeFileSync(`data/aeronave_${this.codigo}.json`, JSON.stringify(dados, null, 2));
            console.log(`✅ Aeronave ${this.codigo} salva com sucesso!`);
        } catch (error) {
            console.error('❌ Erro ao salvar aeronave:', error);
        }
    }

    carregar(codigo: string): void {
        try {
            const arquivo = `data/aeronave_${codigo}.json`;
            
            if (fs.existsSync(arquivo)) {
                const dados = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
                
                this.codigo = dados.codigo;
                this.modelo = dados.modelo;
                this.tipo = dados.tipo;
                this.capacidade = dados.capacidade;
                this.alcance = dados.alcance;
                
                console.log(`✅ Aeronave ${codigo} carregada com sucesso!`);
            } else {
                console.log('❌ Arquivo não encontrado');
            }
        } catch (error) {
            console.error('❌ Erro ao carregar aeronave:', error);
        }
    }

    adicionarPeca(peca: Peca): void {
        this.pecas.push(peca);
    }

    adicionarEtapa(etapa: Etapa): void {
        this.etapas.push(etapa);
    }

    adicionarTeste(teste: Teste): void {
        this.testes.push(teste);
    }
}