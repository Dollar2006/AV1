import inquirer from 'inquirer'
import { AeronaveMenu } from './AeronaveMenu';
import { PecaMenu } from './PecaMenu';
import { FuncionarioMenu } from './FuncionarioMenu';
import { EtapaMenu } from './EtapaMenu';
import { TesteMenu } from './TesteMenu';
import { RelatorioMenu } from './RelatorioMenu';
//Import dos outros Menus

export class MainMenu {
    static async show(): Promise<void> {
        while(true) {
            const {opcao} = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'opcao',
                    message: 'Menu Principal Aerocode',
                    choices: [
                        '✈️  Gerenciar Aeronaves',
                        '🔧 Gerenciar Peças',
                        '👥 Gerenciar Funcionários',
                        '📋 Gerenciar Etapas de Produção',
                        '🧪 Gerenciar Testes',
                        '📊 Gerar Relatórios',
                        '🚪 Sair'
                    ]
                }
            ])
            switch (opcao) {
                case '✈️  Gerenciar Aeronaves':
                    await AeronaveMenu.show();
                    break;
                case '🔧 Gerenciar Peças':
                    await PecaMenu.show();
                    break;
                case '👥 Gerenciar Funcionários':
                    await FuncionarioMenu.show();
                    break;
                case '📋 Gerenciar Etapas de Produção':
                    await EtapaMenu.show();
                    break;
                case '🧪 Gerenciar Testes':
                    await TesteMenu.show();
                    break;
                case '📊 Gerar Relatórios':
                    await RelatorioMenu.show();
                    break;
                case '🚪 Sair':
                    console.log('👋 Obrigado por usar o Aerocode!');
                    return;
            }
        }
    }
}
