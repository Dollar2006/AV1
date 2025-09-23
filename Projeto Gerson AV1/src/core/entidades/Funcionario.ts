import { NivelPermissao } from "../enums/NivelPermissao"
import fs from 'fs'

export default class Funcionario{
    private id: string
    private nome: string
    private telefone: string
    private endereco: string
    private usuario: string
    private senha: string
    private nivelPermissao: NivelPermissao
    constructor(id: string,nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: NivelPermissao) {
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.endereco = endereco
        this.usuario = usuario
        this.senha = senha
        this.nivelPermissao = nivelPermissao
    }
    // --- Getters ---
    public get getId(): string {
        return this.id
    }

    public get getNome(): string {
        return this.nome
    }

    public get getTelefone(): string {
        return this.telefone
    }

    public get getEndereco(): string {
        return this.endereco
    }

    public get getUsuario(): string {
        return this.usuario
    }

    public get getSenha(): string {
        return this.senha
    }

    public get getNivelPermissao(): NivelPermissao {
        return this.nivelPermissao
    }

    // --- Setters ---
    public set setId(novoId: string) {
        this.id = novoId
    }

    public set setNome(novoNome: string) {
        this.nome = novoNome
    }

    public set setTelefone(novoTelefone: string) {
        this.telefone = novoTelefone
    }

    public set setEndereco(novoEndereco: string) {
        this.endereco = novoEndereco
    }

    public set setUsuario(novoUsuario: string) {
        this.usuario = novoUsuario
    }

    public set setSenha(novaSenha: string) {
        this.senha = novaSenha
    }

    public set setNivelPermissao(novoNivelPermissao: NivelPermissao) {
        this.nivelPermissao = novoNivelPermissao
    }

    public autenticar(usuario: string, senha: string): boolean{
        if (usuario == this.getUsuario && senha == this.getSenha){
            return true
        }
        return false
    }

    public salvar(): void {
        try {
            // Garantir que a pasta data existe
            if (!fs.existsSync('data')) {
                fs.mkdirSync('data');
            }

            const dados = {
                id: this.id,
                nome: this.nome,
                telefone: this.telefone,
                endereco: this.endereco,
                usuario: this.usuario,
                senha: this.senha, // ⚠️ Em sistema real, isso seria criptografado!
                nivelPermissao: this.nivelPermissao
            };

            // Salvar em arquivo JSON com o ID como identificador
            fs.writeFileSync(`data/funcionario_${this.id}.json`, JSON.stringify(dados, null, 2));
            console.log(`✅ Funcionário ${this.nome} (ID: ${this.id}) salvo com sucesso!`);
        } catch (error) {
            console.error('❌ Erro ao salvar funcionário:', error);
        }
    }

    public carregar(idFuncionario: string): void {
        try {
            const arquivo = `data/funcionario_${idFuncionario}.json`;

            if (fs.existsSync(arquivo)) {
                const dados = JSON.parse(fs.readFileSync(arquivo, 'utf8'));

                // Preencher os dados na instância atual
                this.id = dados.id;
                this.nome = dados.nome;
                this.telefone = dados.telefone;
                this.endereco = dados.endereco;
                this.usuario = dados.usuario;
                this.senha = dados.senha;
                this.nivelPermissao = dados.nivelPermissao;

                console.log(`✅ Funcionário ${this.nome} carregado com sucesso!`);
            } else {
                console.log(`❌ Arquivo do funcionário ${idFuncionario} não encontrado`);
            }
        } catch (error) {
            console.error('❌ Erro ao carregar funcionário:', error);
        }
    }

    
}