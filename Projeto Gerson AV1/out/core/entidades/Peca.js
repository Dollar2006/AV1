"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Peca {
    nome;
    tipo;
    fornecedor;
    status;
    constructor(nome, tipo, fornecedor, status) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
    }
    get getNome() {
        return this.nome;
    }
    get getTipo() {
        return this.tipo;
    }
    get getFornecedor() {
        return this.fornecedor;
    }
    get getStatus() {
        return this.status;
    }
    atualizarStatus(novoStatus) {
        this.status = novoStatus;
    }
    salvar() {
        const dataDir = path.resolve('data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
        }
        const fileName = `${this.nome.replace(/ /g, '_')}.json`;
        const filePath = path.join(dataDir, fileName);
        const dados = {
            nome: this.nome,
            tipo: this.tipo,
            fornecedor: this.fornecedor,
            status: this.status
        };
        fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
        console.log(`Peça salva em ${filePath}`);
    }
    carregar(nomeArquivo) {
        const dataDir = path.resolve('data');
        const filePath = path.join(dataDir, `${nomeArquivo}.json`);
        if (!fs.existsSync(filePath)) {
            console.log(`Arquivo ${filePath} não encontrado.`);
            return;
        }
        const dados = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        this.nome = dados.nome;
        this.tipo = dados.tipo;
        this.fornecedor = dados.fornecedor;
        this.status = dados.status;
        console.log(`Peça carregada de ${filePath}`);
    }
}
exports.default = Peca;
