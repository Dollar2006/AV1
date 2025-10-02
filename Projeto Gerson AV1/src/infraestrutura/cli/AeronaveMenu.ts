import inquirer from "inquirer";
import { Aeronave } from "../../core/entidades/Aeronave";
import { TipoAeronave } from "../../core/enums/TipoAeronave";

export class AeronaveMenu {
    static aeronaves: Aeronave[] = [];

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
        
    }