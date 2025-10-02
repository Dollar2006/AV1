#!/usr/bin/env node

import { MainMenu } from "./infraestrutura/cli/MainMenu";
import { AeronaveMenu } from "./infraestrutura/cli/AeronaveMenu";
import { PecaMenu } from "./infraestrutura/cli/PecaMenu";
import { FuncionarioMenu } from "./infraestrutura/cli/FuncionarioMenu";
import { EtapaMenu } from "./infraestrutura/cli/EtapaMenu";
import { TesteMenu } from "./infraestrutura/cli/TesteMenu";

console.log('🚀 AEROCODE - Sistema de Gestão de Produção de Aeronaves');
console.log('========================================================\n');
console.log('📦 Inicializando sistema...');

// Carregar dados automaticamente ao iniciar
try {
    AeronaveMenu.carregarAeronaves();
    PecaMenu.carregarPecas();
    FuncionarioMenu.carregarFuncionarios();
    EtapaMenu.carregarEtapas();
    TesteMenu.carregarTestes();
    console.log('✅ Dados carregados com sucesso!\n');
} catch (error) {
    console.log('⚠️  Iniciando com dados vazios...\n');
}

// Função para salvar dados antes de sair
const salvarDadosESair = () => {
    console.log('\n💾 Salvando dados...');
    try {
        AeronaveMenu.salvarAeronaves();
        PecaMenu.salvarPecas();
        FuncionarioMenu.salvarFuncionarios();
        EtapaMenu.salvarEtapas();
        TesteMenu.salvarTestes();
        console.log('✅ Dados salvos!');
    } catch (error) {
        console.error('❌ Erro ao salvar dados:', error);
    }
    console.log('👋 AEROCODE finalizado!');
    process.exit(0);
};

// Configurar handlers para finalização graciosa
process.on('SIGINT', salvarDadosESair);
process.on('SIGTERM', salvarDadosESair);

// Iniciar o sistema
MainMenu.show().catch((error) => {
    console.error('❌ Erro no sistema:', error);
    salvarDadosESair();
});