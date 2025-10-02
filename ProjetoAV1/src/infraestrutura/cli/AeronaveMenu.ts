import inquirer from "inquirer";
import { Aeronave } from "../../core/entidades/Aeronave";
import { TipoAeronave } from "../../core/enums/TipoAeronave";
import fs from 'fs'
import path from 'path'

export class AeronaveMenu {
    static aeronaves: Aeronave[] = [];
    private static aeronavesMap: Map<string, Aeronave> = new Map();
    private static readonly DATA_FILE = 'data/aeronaves.json';

    
    static buscarAeronavePorCodigo(codigo: string): Aeronave | undefined {
        return this.aeronavesMap.get(codigo);
    }

            static salvarAeronaves():void{
            try{
                const dataDir = path.dirname(this.DATA_FILE)
                if(!fs.existsSync(dataDir)){
                    fs.mkdirSync(dataDir, {recursive: true})
                }

                const dadosSerializaveis = this.aeronaves.map(aeronave => ({
                    codigo: aeronave.codigo,
                    modelo: aeronave.modelo,
                    tipo: aeronave.tipo,
                    capacidade: aeronave.capacidade,
                    alcance: aeronave.alcance,
                    pecas: aeronave.pecas,
                    etapas: aeronave.etapas,
                    testes: aeronave.testes
                }))
                 fs.writeFileSync(this.DATA_FILE, JSON.stringify(dadosSerializaveis, null, 2));
                 console.log(`✅ ${this.aeronaves.length} aeronave(s) salvas com sucesso em ${this.DATA_FILE}!`);
            }
            catch (error) {
            console.error('❌ Erro ao salvar aeronaves:', error);
            }
        }

         static carregarAeronaves(): void {
            try {
                if (!fs.existsSync(this.DATA_FILE)) {
                    console.log('📭 Nenhum arquivo de aeronaves encontrado. Iniciando com lista vazia.');
                    return;
                }

                // Ler e parsear o arquivo
                const dados = JSON.parse(fs.readFileSync(this.DATA_FILE, 'utf8'));
                
                // Reconstruir as aeronaves
                this.aeronaves = dados.map((dado: any) => {
                    const aeronave = new Aeronave(
                        dado.codigo,
                        dado.modelo,
                        dado.tipo,
                        dado.capacidade,
                        dado.alcance
                    );

                    // Restaurar arrays associados se existirem
                    if (dado.pecas) aeronave.pecas = dado.pecas;
                    if (dado.etapas) aeronave.etapas = dado.etapas;
                    if (dado.testes) aeronave.testes = dado.testes;

                    return aeronave;
                });

                console.log(`✅ ${this.aeronaves.length} aeronave(s) carregadas com sucesso!`);
            } catch (error) {
                console.error('❌ Erro ao carregar aeronaves:', error);
            }

       

        }

    static async show(): Promise<void> {
        const {acao} = await inquirer.prompt([
            {
                type: 'list',
                name: 'acao',
                message: 'Menu Aeronaves',
                choices: [
                    'Cadastrar Nova Aeronave',
                    'Listar Todas Aeronaves',
                    'Buscar Aeronave por código',
                    'Salvar Aeronave',
                    'Carregar Aeronave',
                    'Voltar'
                ]
            }
        ])
        switch (acao) {
            case 'Cadastrar Nova Aeronave':
                await   this.cadastrarAeronave()
                break;
            case 'Listar Todas Aeronaves':
                await this.listarAeronaves()
                break
            case 'Buscar Aeronave por código':
                await this.buscarPorCodigo()
                break
            case 'Salvar Aeronave':
                this.salvarAeronaves()
                break
            case 'Carregar Aeronave':
                this.carregarAeronaves()
                break
            case 'Voltar':
                break
        }
    }
        static async cadastrarAeronave(): Promise<void>{
            const dados = await inquirer.prompt([
                {type: 'input', name: 'codigo', message: 'Qual o código da aeronave? '},
                {type: 'input', name: 'modelo', message: 'Qual o modelo da aeronave? '},
                {
                    type: 'list',
                    name: 'tipo',
                    message: 'Dentro os tipos de aeronaves,qual se adequa a sua aeronave? ',
                    choices: Object.values(TipoAeronave)
                },
                {type: 'number', name: 'capacidade', message: 'Qual a capacidade da aeronave? '},
                {type: 'number', name: 'alcance', message: 'Qual o alcance da aeronave em km?'}
            ])
            const aeronave = new Aeronave(
                dados.codigo,
                dados.modelo,
                dados.tipo,
                dados.capacidade,
                dados.alcance
            )
            this.aeronaves.push(aeronave)
            console.log('Aeronave cadadastrada com sucesso!')
        }

        static async listarAeronaves(): Promise<void>{
            if (this.aeronaves.length === 0){
                console.log('Nenhuma aeronave cadastrada.')
                return
            }
            console.log('\n LISTA DE AERONAVES:')
            this.aeronaves.forEach((aeronave,index)=>{
                console.log(`${index + 1}. ${aeronave.codigo} - ${aeronave.modelo} (${aeronave.tipo})`);
            })
        }

        

        static async buscarPorCodigo(): Promise<void>{
            const resposta:{codigo:string} = await inquirer.prompt([
                {type: 'input', name: 'codigo',message:'Para encontrar uma aeronave expecifica, digite o código da aeronave: '}
            ])
            const {codigo} = resposta
            const aeronave = this.buscarAeronavePorCodigo(codigo);

            if (aeronave) {
                console.log('✅ Aeronave encontrada:');
            aeronave.exibirDetalhes();
            } else {
                console.log('❌ Aeronave não encontrada!');
        }
        }

    }