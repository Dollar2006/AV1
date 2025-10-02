import { TipoPeca } from '../enums/TipoPeca';
import { StatusPeca } from '../enums/StatusPeca';
import * as fs from 'fs';
import * as path from 'path';

export class Peca {
    private nome: string;
    private tipo: TipoPeca;
    private fornecedor: string;
    private status: StatusPeca;

    constructor(nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca) {
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

    atualizarStatus(novoStatus: StatusPeca) {
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

    carregar(nomeArquivo: string) {
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