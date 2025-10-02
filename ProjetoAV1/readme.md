# 🚀 AEROCODE - Sistema de Gestão de Produção de Aeronaves

## 📋 Índice
- [Instalação e Execução](#-instalação-e-execução)
- [Manual do Usuário](#-manual-do-usuário)
- [Funcionalidades do Sistema](#-funcionalidades-do-sistema)
- [Estrutura do Projeto](#-estrutura-do-projeto)

---

## ⚡ Instalação e Execução

### Pré-requisitos
- **Node.js** (versão 16 ou superior)
- **npm** (geralmente vem com o Node.js)

### 🛠️ Configuração do Projeto

Siga estes passos para configurar e executar o sistema:

```bash
# 1. Navegue até a pasta do projeto
cd ProjetoAV1

# 2. Instale as dependências
npm install

# 3. Compile o código TypeScript
npm run build

# 4. Execute o sistema
npm start
```

### 🚀 Comandos Rápidos
```bash
# Desenvolvimento (com recarregamento automático)
npm run dev

# Compilar apenas
npm run build

# Executar versão compilada
npm start

# Limpar arquivos compilados
npm run clean
```

---

## 📖 Manual do Usuário

### 🏠 Menu Principal
Ao iniciar o sistema, você verá o **Menu Principal** com as seguintes opções:

```
🚀 AEROCODE - Sistema de Gestão de Produção de Aeronaves
========================================================

Menu Principal AEROCODE
? Escolha uma opção:
  ✈️  Aeronaves
  🔧 Peças
  👥 Funcionários
  📋 Etapas
  🧪 Testes
  📊 Relatórios
  🚪 Sair
```

### ✈️ Menu de Aeronaves
**Funcionalidades disponíveis:**
- **Cadastrar Nova Aeronave**: Adiciona uma nova aeronave ao sistema
- **Listar Todas Aeronaves**: Exibe todas as aeronaves cadastradas
- **Buscar Aeronave por código**: Localiza uma aeronave específica
- **Salvar Aeronaves**: Salva os dados no arquivo JSON
- **Carregar Aeronaves**: Carrega dados salvos anteriormente

**Exemplo de cadastro:**
```
Código: AV001
Modelo: EMB-195
Tipo: COMERCIAL
Capacidade: 120
Alcance: 4000 km
```

### 🔧 Menu de Peças
**Funcionalidades:**
- Cadastrar novas peças (Nacionais ou Importadas)
- Listar todas as peças cadastradas
- Buscar peças por nome
- Atualizar status das peças (Em Produção, Em Transporte, Pronta)
- Gerenciar persistência dos dados

**Status das Peças:**
- 🏭 `EM_PRODUCAO`: Peça em processo de fabricação
- 🚚 `EM_TRANSPORTE`: Peça em trânsito para montagem
- ✅ `PRONTA`: Peça disponível para uso

### 👥 Menu de Funcionários
**Funcionalidades:**
- Cadastro de funcionários com dados completos
- Sistema de autenticação por usuário e senha
- Níveis de permissão (Administrador, Engenheiro, Operador)
- Busca por ID do funcionário
- Listagem completa da equipe

**Níveis de Permissão:**
- 👑 **ADMINISTRADOR**: Acesso total ao sistema
- 🔧 **ENGENHEIRO**: Acesso a módulos técnicos
- 👷 **OPERADOR**: Acesso básico às funcionalidades

### 📋 Menu de Etapas de Produção
**Funcionalidades:**
- Cadastro de etapas do processo produtivo
- Definição de prazos para cada etapa
- Controle de status (Pendente, Em Andamento, Concluída)
- Início e finalização de etapas
- Sequenciamento lógico das atividades

**Fluxo de Etapas:**
```
PENDENTE → EM_ANDAMENTO → CONCLUÍDA
```

### 🧪 Menu de Testes
**Funcionalidades:**
- Cadastro de testes (Elétricos, Hidráulicos, Aerodinâmicos)
- Registro de resultados (Aprovado/Reprovado)
- Execução simulada de testes
- Relatório de desempenho
- Histórico de testes realizados

**Tipos de Teste:**
- ⚡ **ELÉTRICO**: Sistemas elétricos e eletrônicos
- 💧 **HIDRÁULICO**: Sistemas hidráulicos e pneumáticos
- 🌬️ **AERODINÂMICO**: Performance aerodinâmica

### 📊 Menu de Relatórios
**Funcionalidades:**
- **Relatório por Aeronave**: Gera relatório detalhado de uma aeronave específica
- **Relatório do Sistema**: Estatísticas completas do sistema
- **Relatórios Salvos**: Lista e visualiza relatórios anteriores

**Conteúdo dos Relatórios:**
- Dados completos da aeronave
- Lista de peças utilizadas
- Histórico de etapas realizadas
- Resultados de todos os testes
- Informações do cliente e data de entrega

---

## 💾 Sistema de Persistência

### 📁 Estrutura de Arquivos
```
ProjetoAV1/
├── data/
│   ├── aeronaves.json
│   ├── pecas.json
│   ├── funcionarios.json
│   ├── etapas.json
│   ├── testes.json
│   └── relatorio_*.txt
├── src/
│   └── core/
│       ├── entidades/
│       └── enums/
└── out/ (gerado automaticamente)
```

### 🔄 Salvamento Automático
- **Ao iniciar**: Sistema carrega automaticamente dados salvos
- **Ao sair**: Dados são salvos automaticamente (Ctrl+C)
- **Manual**: Opção de salvar disponível em cada menu

---

## 🎯 Dicas de Uso

### ✅ Melhores Práticas
1. **Cadastre funcionários primeiro** para usar o sistema de autenticação
2. **Salve frequentemente** para não perder dados
3. **Use códigos únicos** para aeronaves e peças
4. **Siga a sequência lógica** nas etapas de produção

### ⚠️ Solução de Problemas
- **Dados não carregam**: Verifique se os arquivos JSON existem na pasta `data/`
- **Erro de compilação**: Execute `npm install` novamente
- **Menu não responde**: Use Ctrl+C para reiniciar o sistema

### 🔧 Comandos do Terminal
- `Ctrl+C`: Sai do sistema graciosamente (salva dados)
- `Ctrl+Z`: Força saída (pode perder dados não salvos)

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique se todas as dependências foram instaladas
2. Confirme que está na pasta correta do projeto
3. Execute `npm install` novamente se necessário
