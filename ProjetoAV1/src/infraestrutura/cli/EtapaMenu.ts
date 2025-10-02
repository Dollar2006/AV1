import inquirer from "inquirer";
import { Etapa } from "../../core/entidades/Etapa";
import { StatusEtapa } from "../../core/enums/StatusEtapa";
import fs from 'fs'
import path from 'path'

export class EtapaMenu {
    static etapas: Etapa[] = [];
    private static etapasMap: Map<string, Etapa> = new Map();
    private static readonly DATA_FILE = 'data/etapas.json';

    static buscarEtapaPorNome(nome: string): Etapa | undefined {
        return this.etapasMap.get(nome);
    }

    static salvarEtapas(): void {
        try {
            const dataDir = path.dirname(this.DATA_FILE);
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }

            const dadosSerializaveis = this.etapas.map(etapa => ({
                nome: etapa.nome,
                prazo: etapa.prazo.toISOString(),
                status: etapa.status
            }));

            fs.writeFileSync(this.DATA_FILE, JSON.stringify(dadosSerializaveis, null, 2));
            console.log(`✅ ${this.etapas.length} etapa(s) salva(s) com sucesso em ${this.DATA_FILE}!`);
        } catch (error) {
            console.error('❌ Erro ao salvar etapas:', error);
        }
    }

    static carregarEtapas(): void {
        try {
            if (!fs.existsSync(this.DATA_FILE)) {
                console.log('📭 Nenhum arquivo de etapas encontrado. Iniciando com lista vazia.');
                return;
            }

            const dados = JSON.parse(fs.readFileSync(this.DATA_FILE, 'utf8'));
            
            this.etapas = dados.map((dado: any) => {
                return new Etapa(
                    dado.nome,
                    new Date(dado.prazo),
                    dado.status
                );
            });

            console.log(`✅ ${this.etapas.length} etapa(s) carregada(s) com sucesso!`);
        } catch (error) {
            console.error('❌ Erro ao carregar etapas:', error);
        }
    }

    static async show(): Promise<void> {
        const { acao } = await inquirer.prompt([
            {
                type: 'list',
                name: 'acao',
                message: 'Menu Etapas',
                choices: [
                    'Cadastrar Nova Etapa',
                    'Listar Todas Etapas',
                    'Buscar Etapa por nome',
                    'Iniciar Etapa',
                    'Finalizar Etapa',
                    'Salvar Etapas',
                    'Carregar Etapas',
                    'Voltar'
                ]
            }
        ]);

        switch (acao) {
            case 'Cadastrar Nova Etapa':
                await this.cadastrarEtapa();
                break;
            case 'Listar Todas Etapas':
                await this.listarEtapas();
                break;
            case 'Buscar Etapa por nome':
                await this.buscarPorNome();
                break;
            case 'Iniciar Etapa':
                await this.iniciarEtapa();
                break;
            case 'Finalizar Etapa':
                await this.finalizarEtapa();
                break;
            case 'Salvar Etapas':
                this.salvarEtapas();
                break;
            case 'Carregar Etapas':
                this.carregarEtapas();
                break;
            case 'Voltar':
                break;
        }
    }

    static async cadastrarEtapa(): Promise<void> {
        const dados = await inquirer.prompt([
            { type: 'input', name: 'nome', message: 'Qual o nome da etapa? ' },
            { type: 'input', name: 'prazo', message: 'Qual o prazo (YYYY-MM-DD)? ' }
        ]);

        const etapa = new Etapa(
            dados.nome,
            new Date(dados.prazo)
        );

        this.etapas.push(etapa);
        this.etapasMap.set(dados.nome, etapa);
        console.log('Etapa cadastrada com sucesso!');
    }

    static async listarEtapas(): Promise<void> {
        if (this.etapas.length === 0) {
            console.log('Nenhuma etapa cadastrada.');
            return;
        }

        console.log('\n LISTA DE ETAPAS:');
        this.etapas.forEach((etapa, index) => {
            console.log(`${index + 1}. ${etapa.nome} - Prazo: ${etapa.prazo.toLocaleDateString()} - Status: ${etapa.status}`);
        });
    }

    static async buscarPorNome(): Promise<void> {
        const resposta: { nome: string } = await inquirer.prompt([
            { type: 'input', name: 'nome', message: 'Digite o nome da etapa: ' }
        ]);

        const { nome } = resposta;
        const etapa = this.buscarEtapaPorNome(nome);

        if (etapa) {
            console.log('✅ Etapa encontrada:');
            console.log(`Nome: ${etapa.nome}`);
            console.log(`Prazo: ${etapa.prazo.toLocaleDateString()}`);
            console.log(`Status: ${etapa.status}`);
        } else {
            console.log('❌ Etapa não encontrada!');
        }
    }

    static async iniciarEtapa(): Promise<void> {
        const resposta: { nome: string } = await inquirer.prompt([
            { type: 'input', name: 'nome', message: 'Digite o nome da etapa para iniciar: ' }
        ]);

        const { nome } = resposta;
        const etapa = this.buscarEtapaPorNome(nome);

        if (etapa) {
            etapa.iniciar();
        } else {
            console.log('❌ Etapa não encontrada!');
        }
    }

    static async finalizarEtapa(): Promise<void> {
        const resposta: { nome: string } = await inquirer.prompt([
            { type: 'input', name: 'nome', message: 'Digite o nome da etapa para finalizar: ' }
        ]);

        const { nome } = resposta;
        const etapa = this.buscarEtapaPorNome(nome);

        if (etapa) {
            etapa.finalizar();
        } else {
            console.log('❌ Etapa não encontrada!');
        }
    }
}