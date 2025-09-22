import { TipoAeronave } from "../enums/TipoAeronave"

class Aeronave {
    private codigo: string
    private modelo: string
    private tipo: TipoAeronave
    private capacidade: number
    private alcance: number
    constructor(codigo: string,modelo: string,tipo: TipoAeronave,capacidade: number,alcance: number) {
        this.codigo = codigo
        this.modelo = modelo
        this.tipo = tipo
        this.capacidade = capacidade
        this.alcance = alcance
    }
    public get getCodigo(): string {
        return this.codigo;
    }

    public get getModelo(): string {
        return this.modelo;
    }

    public get getTipo(): TipoAeronave {
        return this.tipo;
    }

    public get getCapacidade(): number {
        return this.capacidade;
    }

    public get getAlcance(): number {
        return this.alcance;
    }

  
    public set setCodigo(novoCodigo: string) {
        this.codigo = novoCodigo;
    }

    public set setModelo(novoModelo: string) {
        this.modelo = novoModelo;
    }

    public set setTipo(novoTipo: TipoAeronave) {
        this.tipo = novoTipo;
    }

    public set setCapacidade(novaCapacidade: number) {
        if (novaCapacidade > 0) { // Exemplo de validação
            this.capacidade = novaCapacidade;
        } else {
            console.log("A capacidade deve ser um número positivo.");
        }
    }

    public set setAlcance(novoAlcance: number) {
        if (novoAlcance > 0) {
            this.alcance = novoAlcance;
        } else {
            console.log("O alcance deve ser um número positivo.");
        }
    }
    public detalhes(): void{
        console.log('-------------DADOS DA AERONAVE----------------\n')
        console.log(``)
    }
}