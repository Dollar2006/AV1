import { StatusEtapa } from '../enums/StatusEtapa';
import Funcionario from './Funcionario';
import fs from 'fs';

export class Etapa {
    private funcionarios: Funcionario[] = [];

    constructor(
        public nome: string,
        public prazo: Date,
        public status: StatusEtapa = StatusEtapa.PENDENTE
    ) {}

    iniciar(): void {
        if (this.status === StatusEtapa.PENDENTE) {
            this.status = StatusEtapa.ANDAMENTO;
            console.log(`✅ Etapa ${this.nome} iniciada!`);
        } else {
            console.log(`❌ Não é possível iniciar a etapa ${this.nome}. Status atual: ${this.status}`);
        }
    }

    finalizar(): void {
        if (this.status === StatusEtapa.ANDAMENTO) {
            this.status = StatusEtapa.CONCLUIDA;
            console.log(`✅ Etapa ${this.nome} concluída!`);
        } else {
            console.log(`❌ Não é possível finalizar a etapa ${this.nome}. Status atual: ${this.status}`);
        }
    }

    adicionarFuncionario(funcionario: Funcionario): void {
        if (!this.funcionarios.find(f => f.getId === funcionario.getId)) {
            this.funcionarios.push(funcionario);
            console.log(`✅ Funcionário ${funcionario.getNome} adicionado à etapa ${this.nome}`);
        } else {
            console.log(`❌ Funcionário já está associado a esta etapa`);
        }
    }

    listarFuncionarios(): Funcionario[] {
        return this.funcionarios;
    }

    salvar(): void {
        try {
            if (!fs.existsSync('data')) {
                fs.mkdirSync('data');
            }

            const dados = {
                nome: this.nome,
                prazo: this.prazo.toISOString(),
                status: this.status,
                funcionarios: this.funcionarios.map(func => ({
                    id: func.getId,
                    nome: func.getNome
                }))
            };

            fs.writeFileSync(`data/etapa_${this.nome.replace(/\s+/g, '_')}.json`, JSON.stringify(dados, null, 2));
            console.log(`✅ Etapa ${this.nome} salva com sucesso!`);
        } catch (error) {
            console.error('❌ Erro ao salvar etapa:', error);
        }
    }

    carregar(nomeEtapa: string): void {
        try {
            const arquivo = `data/etapa_${nomeEtapa.replace(/\s+/g, '_')}.json`;
            
            if (fs.existsSync(arquivo)) {
                const dados = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
                
                this.nome = dados.nome;
                this.prazo = new Date(dados.prazo);
                this.status = dados.status;
                
                console.log(`✅ Etapa ${nomeEtapa} carregada com sucesso!`);
            } else {
                console.log('❌ Arquivo não encontrado');
            }
        } catch (error) {
            console.error('❌ Erro ao carregar etapa:', error);
        }
    }
}