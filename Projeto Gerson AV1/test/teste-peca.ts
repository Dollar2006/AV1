import Peca from '../src/core/entidades/Peca';
import { TipoPeca } from '../src/core/enums/TipoPeca';
import { StatusPeca } from '../src/core/enums/StatusPeca';

// Teste da classe Peca
console.log('🧪 TESTANDO CLASSE PECA\n');

// 1. Criar uma peça
const peca1 = new Peca(
    'Trem de pouso dianteiro',
    TipoPeca.IMPORTADA,
    'Boeing',
    StatusPeca.EM_PRODUCAO
);

console.log('1. Peça criada:');
console.log(`   Nome: ${peca1.getNome}`);
console.log(`   Tipo: ${peca1.getTipo}`);
console.log(`   Fornecedor: ${peca1.getFornecedor}`);
console.log(`   Status: ${peca1.getStatus}`);

// 2. Testar atualização de status
console.log('\n2. Atualizando status:');
peca1.atualizarStatus(StatusPeca.PRONTA);
console.log(`   Novo status: ${peca1.getStatus}`);

// 3. Testar método salvar
console.log('\n3. Salvando peça:');
peca1.salvar();

// 4. Testar método carregar
console.log('\n4. Carregando peça:');
const peca2 = new Peca('', TipoPeca.NACIONAL, '', StatusPeca.EM_PRODUCAO);
peca2.carregar('Trem_de_pouso_dianteiro');

console.log('\n5. Dados da peça carregada:');
console.log(`   Nome: ${peca2.getNome}`);
console.log(`   Tipo: ${peca2.getTipo}`);
console.log(`   Fornecedor: ${peca2.getFornecedor}`);
console.log(`   Status: ${peca2.getStatus}`);

console.log('\n✅ Teste concluído!');