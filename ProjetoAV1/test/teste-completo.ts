import { Aeronave } from '../src/core/entidades/Aeronave';
import { Peca } from '../src/core/entidades/Peca';
import { Etapa } from '../src/core/entidades/Etapa';
import { Teste } from '../src/core/entidades/Teste';
import { Relatorio } from '../src/core/entidades/Relatorio';
import Funcionario from '../src/core/entidades/Funcionario';

import { TipoAeronave } from '../src/core/enums/TipoAeronave';
import { TipoPeca } from '../src/core/enums/TipoPeca';
import { StatusPeca } from '../src/core/enums/StatusPeca';
import { StatusEtapa } from '../src/core/enums/StatusEtapa';
import { TipoTeste } from '../src/core/enums/TipoTeste';
import { ResultadoTeste } from '../src/core/enums/ResultadoTeste';
import { NivelPermissao } from '../src/core/enums/NivelPermissao';

console.log('🚀 TESTE COMPLETO DO SISTEMA AEROCODE\n');

// 1. Criar funcionários
console.log('1. CRIANDO FUNCIONÁRIOS');
const eng1 = new Funcionario(
    'F001', 
    'Carlos Engenheiro', 
    '(11) 9999-8888', 
    'Rua Tech, 123', 
    'carlos.eng', 
    'senha123', 
    NivelPermissao.ENGENHEIRO
);
const op1 = new Funcionario(
    'F002', 
    'Ana Operadora', 
    '(11) 7777-6666', 
    'Av. Trabalho, 456', 
    'ana.op', 
    'senha456', 
    NivelPermissao.OPERADOR
);

// 2. Criar aeronave
console.log('\n2. CRIANDO AERONAVE');
const aeronave1 = new Aeronave(
    'AV001',
    'EMB-195',
    TipoAeronave.COMERCIAL,
    120,
    4000
);

// 3. Criar e adicionar peças
console.log('\n3. ADICIONANDO PEÇAS');
const peca1 = new Peca('Asa direita', TipoPeca.NACIONAL, 'Embraer', StatusPeca.PRONTA);
const peca2 = new Peca('Motor', TipoPeca.IMPORTADA, 'General Electric', StatusPeca.EM_PRODUCAO);
aeronave1.adicionarPeca(peca1);
aeronave1.adicionarPeca(peca2);

// 4. Criar e gerenciar etapas
console.log('\n4. GERENCIANDO ETAPAS');
const etapa1 = new Etapa('Montagem da Fuselagem', new Date('2024-12-01'));
const etapa2 = new Etapa('Instalação Elétrica', new Date('2024-12-10'));

etapa1.adicionarFuncionario(eng1);
etapa1.adicionarFuncionario(op1);
etapa1.iniciar();
etapa1.finalizar();

etapa2.adicionarFuncionario(eng1);
etapa2.iniciar();

aeronave1.adicionarEtapa(etapa1);
aeronave1.adicionarEtapa(etapa2);

// 5. Criar e executar testes
console.log('\n5. EXECUTANDO TESTES');
const teste1 = new Teste(TipoTeste.ELETRICO, ResultadoTeste.APROVADO);
const teste2 = new Teste(TipoTeste.AERODINAMICO, ResultadoTeste.APROVADO);

teste1.executarTeste();
teste2.executarTeste();

aeronave1.adicionarTeste(teste1);
aeronave1.adicionarTeste(teste2);

// 6. Exibir detalhes da aeronave
console.log('\n6. DETALHES DA AERONAVE');
aeronave1.exibirDetalhes();

// 7. Gerar relatório final
console.log('\n7. GERANDO RELATÓRIO');
const relatorio = new Relatorio(aeronave1, 'Companhia Aérea Brasil', new Date('2024-12-25'));
relatorio.salvarEmArquivo();

// 8. Salvar todos os dados
console.log('\n8. SALVANDO TODOS OS DADOS');
aeronave1.salvar();
peca1.salvar();
peca2.salvar();
etapa1.salvar();
etapa2.salvar();
teste1.salvar();
teste2.salvar();
eng1.salvar();
op1.salvar();

console.log('\n✅ SISTEMA COMPLETO TESTADO COM SUCESSO!');
console.log('📁 Verifique a pasta "data" para ver todos os arquivos gerados');