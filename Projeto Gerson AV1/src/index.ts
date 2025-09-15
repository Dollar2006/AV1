#!/usr/bin/env node

import { main } from './infraestrutura/cli/Cli'

console.log('🚀 Aerocode CLI - Sistema de Gestão de Produção de Aeronaves');
console.log('============================================================');

// Iniciar a aplicação
main().catch(console.error);