"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Aeronave {
    codigo;
    modelo;
    tipo;
    capacidade;
    alcance;
    constructor(codigo, modelo, tipo, capacidade, alcance) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
    }
    get getCodigo() {
        return this.codigo;
    }
    get getModelo() {
        return this.modelo;
    }
    get getTipo() {
        return this.tipo;
    }
    get getCapacidade() {
        return this.capacidade;
    }
    get getAlcance() {
        return this.alcance;
    }
    set setCodigo(novoCodigo) {
        this.codigo = novoCodigo;
    }
    set setModelo(novoModelo) {
        this.modelo = novoModelo;
    }
    set setTipo(novoTipo) {
        this.tipo = novoTipo;
    }
    set setCapacidade(novaCapacidade) {
        if (novaCapacidade > 0) { // Exemplo de validação
            this.capacidade = novaCapacidade;
        }
        else {
            console.log("A capacidade deve ser um número positivo.");
        }
    }
    set setAlcance(novoAlcance) {
        if (novoAlcance > 0) {
            this.alcance = novoAlcance;
        }
        else {
            console.log("O alcance deve ser um número positivo.");
        }
    }
    detalhes() {
        console.log('-------------DADOS DA AERONAVE----------------\n');
        console.log(``);
    }
}
