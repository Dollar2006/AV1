import inquirer from "inquirer";
import { Relatorio } from "../../core/entidades/Relatorio";
import { AeronaveMenu } from "./AeronaveMenu";
import { PecaMenu } from "./PecaMenu";
import { EtapaMenu } from "./EtapaMenu";
import { TesteMenu } from "./TesteMenu";

export class RelatorioMenu {
    static async show(): Promise<void> {
        const { acao } = await inquirer.prompt([
            {
                type: 'list',
                name: 'acao',
                message: 'Menu Relatórios',
                choices: [
                    'Gerar Relatório por Aeronave',
                    'Gerar Relatório Completo do Sistema',
                    'Listar Relatórios Salvos',
                    'Voltar'
                ]
            }
        ]);

        switch (acao) {
            case 'Gerar Relatório por Aeronave':
                await this.gerarRelatorioPorAeronave();
                break;
            case 'Gerar Relatório Completo do Sistema':
                await this.gerarRelatorioSistema();
                break;
            case 'Listar Relatórios Salvos':
                await this.listarRelatoriosSalvos();
                break;
            case 'Voltar':
                break;
        }
    }

    static async gerarRelatorioPorAeronave(): Promise<void> {
        // Verificar se existem aeronaves cadastradas
        if (AeronaveMenu['aeronaves'].length === 0) {
            console.log('❌ Nenhuma aeronave cadastrada no sistema.');
            return;
        }

        // Listar aeronaves disponíveis
        console.log('\n📋 AERONAVES DISPONÍVEIS:');
        AeronaveMenu['aeronaves'].forEach((aeronave: any, index: number) => {
            console.log(`${index + 1}. ${aeronave.codigo} - ${aeronave.modelo} (${aeronave.tipo})`);
        });

        const dados = await inquirer.prompt([
            { 
                type: 'input', 
                name: 'codigoAeronave', 
                message: 'Digite o código da aeronave para o relatório: ',
                validate: (input: string) => {
                    if (!input.trim()) return '❌ O código é obrigatório!';
                    
                    // Verificar se a aeronave existe
                    const aeronave = AeronaveMenu['aeronaves'].find((a: any) => a.codigo === input);
                    if (!aeronave) return '❌ Aeronave não encontrada!';
                    
                    return true;
                }
            },
            { 
                type: 'input', 
                name: 'nomeCliente', 
                message: 'Nome do cliente: ',
                validate: (input: string) => {
                    if (!input.trim()) return '❌ O nome do cliente é obrigatório!';
                    return true;
                }
            },
            { 
                type: 'input', 
                name: 'dataEntrega', 
                message: 'Data de entrega (YYYY-MM-DD): ',
                validate: (input: string) => {
                    if (!input.trim()) return '❌ A data é obrigatória!';
                    if (isNaN(Date.parse(input))) return '❌ Data inválida!';
                    return true;
                }
            }
        ]);

        // Buscar a aeronave real
        const aeronave = AeronaveMenu['aeronaves'].find((a: any) => a.codigo === dados.codigoAeronave);
        
        if (!aeronave) {
            console.log('❌ Aeronave não encontrada!');
            return;
        }

        // Criar e exibir o relatório
        const relatorio = new Relatorio(
            aeronave,
            dados.nomeCliente,
            new Date(dados.dataEntrega)
        );

        console.log('\n📊 RELATÓRIO GERADO:');
        console.log(relatorio.gerarRelatorio());
        
        // Perguntar se quer salvar
        const { salvar } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'salvar',
                message: 'Deseja salvar o relatório em arquivo?',
                default: true
            }
        ]);

        if (salvar) {
            relatorio.salvarEmArquivo();
        }
    }

    static async gerarRelatorioSistema(): Promise<void> {
        console.log('\n📊 RELATÓRIO COMPLETO DO SISTEMA');
        console.log('================================\n');

        // Estatísticas de Aeronaves
        console.log('✈️  ESTATÍSTICAS DE AERONAVES:');
        console.log(`   Total de Aeronaves: ${AeronaveMenu['aeronaves'].length}`);
        
        const comerciais = AeronaveMenu['aeronaves'].filter((a: any) => a.tipo === 'COMERCIAL').length;
        const militares = AeronaveMenu['aeronaves'].filter((a: any) => a.tipo === 'MILITAR').length;
        
        console.log(`   - Comerciais: ${comerciais}`);
        console.log(`   - Militares: ${militares}`);
        
        if (AeronaveMenu['aeronaves'].length > 0) {
            const totalCapacidade = AeronaveMenu['aeronaves'].reduce((sum: number, a: any) => sum + a.capacidade, 0);
            const mediaCapacidade = totalCapacidade / AeronaveMenu['aeronaves'].length;
            console.log(`   Capacidade média: ${mediaCapacidade.toFixed(1)} passageiros`);
        }

        // Estatísticas de Peças
        console.log('\n🔧 ESTATÍSTICAS DE PEÇAS:');
        console.log(`   Total de Peças: ${PecaMenu['pecas']?.length || 0}`);
        
        if (PecaMenu['pecas'] && PecaMenu['pecas'].length > 0) {
            const nacionais = PecaMenu['pecas'].filter((p: any) => p.tipo === 'NACIONAL').length;
            const importadas = PecaMenu['pecas'].filter((p: any) => p.tipo === 'IMPORTADA').length;
            
            console.log(`   - Nacionais: ${nacionais}`);
            console.log(`   - Importadas: ${importadas}`);
            
            // Status das peças
            const emProducao = PecaMenu['pecas'].filter((p: any) => p.status === 'EM_PRODUCAO').length;
            const emTransporte = PecaMenu['pecas'].filter((p: any) => p.status === 'EM_TRANSPORTE').length;
            const prontas = PecaMenu['pecas'].filter((p: any) => p.status === 'PRONTA').length;
            
            console.log(`   Status das Peças:`);
            console.log(`   - Em produção: ${emProducao}`);
            console.log(`   - Em transporte: ${emTransporte}`);
            console.log(`   - Prontas: ${prontas}`);
        }

        // Estatísticas de Funcionários
        console.log('\n👥 ESTATÍSTICAS DE FUNCIONÁRIOS:');
        // Nota: Você precisaria importar FuncionarioMenu se tiver um
        
        // Estatísticas de Etapas
        console.log('\n📋 ESTATÍSTICAS DE ETAPAS:');
        console.log(`   Total de Etapas: ${EtapaMenu['etapas']?.length || 0}`);
        
        if (EtapaMenu['etapas'] && EtapaMenu['etapas'].length > 0) {
            const pendentes = EtapaMenu['etapas'].filter((e: any) => e.status === 'PENDENTE').length;
            const andamento = EtapaMenu['etapas'].filter((e: any) => e.status === 'ANDAMENTO').length;
            const concluidas = EtapaMenu['etapas'].filter((e: any) => e.status === 'CONCLUIDA').length;
            
            console.log(`   Status das Etapas:`);
            console.log(`   - Pendentes: ${pendentes}`);
            console.log(`   - Em andamento: ${andamento}`);
            console.log(`   - Concluídas: ${concluidas}`);
        }

        // Estatísticas de Testes
        console.log('\n🧪 ESTATÍSTICAS DE TESTES:');
        console.log(`   Total de Testes: ${TesteMenu['testes']?.length || 0}`);
        
        if (TesteMenu['testes'] && TesteMenu['testes'].length > 0) {
            const eletricos = TesteMenu['testes'].filter((t: any) => t.tipo === 'ELETRICO').length;
            const hidraulicos = TesteMenu['testes'].filter((t: any) => t.tipo === 'HIDRAULICO').length;
            const aerodinamicos = TesteMenu['testes'].filter((t: any) => t.tipo === 'AERODINAMICO').length;
            
            console.log(`   Tipos de Testes:`);
            console.log(`   - Elétricos: ${eletricos}`);
            console.log(`   - Hidráulicos: ${hidraulicos}`);
            console.log(`   - Aerodinâmicos: ${aerodinamicos}`);
            
            const aprovados = TesteMenu['testes'].filter((t: any) => t.resultado === 'APROVADO').length;
            const reprovados = TesteMenu['testes'].filter((t: any) => t.resultado === 'REPROVADO').length;
            
            console.log(`   Resultados:`);
            console.log(`   - Aprovados: ${aprovados}`);
            console.log(`   - Reprovados: ${reprovados}`);
            
            const taxaAprovacao = (aprovados / TesteMenu['testes'].length) * 100;
            console.log(`   Taxa de Aprovação: ${taxaAprovacao.toFixed(1)}%`);
        }

        console.log('\n✅ Relatório do sistema gerado com sucesso!');

        // Perguntar se quer salvar o relatório do sistema
        const { salvar } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'salvar',
                message: 'Deseja salvar este relatório do sistema em arquivo?',
                default: false
            }
        ]);

        if (salvar) {
            this.salvarRelatorioSistema();
        }
    }

    static async listarRelatoriosSalvos(): Promise<void> {
        const fs = await import('fs');
        const path = await import('path');

        const relatoriosDir = 'data';
        
        if (!fs.existsSync(relatoriosDir)) {
            console.log('📭 Nenhum relatório salvo encontrado.');
            return;
        }

        const arquivos = fs.readdirSync(relatoriosDir)
            .filter(arquivo => arquivo.startsWith('relatorio_') && arquivo.endsWith('.txt'));

        if (arquivos.length === 0) {
            console.log('📭 Nenhum relatório salvo encontrado.');
            return;
        }

        console.log('\n📁 RELATÓRIOS SALVOS:');
        arquivos.forEach((arquivo, index) => {
            console.log(`${index + 1}. ${arquivo}`);
        });

        const { visualizar } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'visualizar',
                message: 'Deseja visualizar algum relatório?',
                default: false
            }
        ]);

        if (visualizar) {
            const { arquivoSelecionado } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'arquivoSelecionado',
                    message: 'Selecione o relatório para visualizar:',
                    choices: arquivos
                }
            ]);

            const conteudo = fs.readFileSync(path.join(relatoriosDir, arquivoSelecionado), 'utf8');
            console.log(`\n📄 CONTEÚDO DO RELATÓRIO ${arquivoSelecionado}:`);
            console.log('================================');
            console.log(conteudo);
        }
    }

    static salvarRelatorioSistema(): void {
        const fs = require('fs');
        const path = require('path');

        try {
            const dataDir = 'data';
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const nomeArquivo = `relatorio_sistema_${timestamp}.txt`;
            
            let relatorioTexto = 'RELATÓRIO COMPLETO DO SISTEMA AEROCODE\n';
            relatorioTexto += '=======================================\n\n';
            
            // Aqui você reconstruiria todo o relatório em formato de texto
            relatorioTexto += `Data de geração: ${new Date().toLocaleString()}\n\n`;
            relatorioTexto += `Total de Aeronaves: ${AeronaveMenu['aeronaves'].length}\n`;
            relatorioTexto += `Total de Peças: ${PecaMenu['pecas']?.length || 0}\n`;
            relatorioTexto += `Total de Etapas: ${EtapaMenu['etapas']?.length || 0}\n`;
            relatorioTexto += `Total de Testes: ${TesteMenu['testes']?.length || 0}\n`;

            fs.writeFileSync(path.join(dataDir, nomeArquivo), relatorioTexto);
            console.log(`✅ Relatório do sistema salvo em: data/${nomeArquivo}`);
        } catch (error) {
            console.error('❌ Erro ao salvar relatório do sistema:', error);
        }
    }
}