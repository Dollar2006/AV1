import { ResultadoTeste } from "../enums/ResultadoTeste";
import { TipoTeste } from "../enums/TipoTeste";

export default class Teste {
    tipoTeste: TipoTeste
    resultado: ResultadoTeste
    constructor(tipoTeste: TipoTeste, resultado: ResultadoTeste){
        this.tipoTeste = tipoTeste
        this.resultado = resultado
    }
    public get getTipoTeste(): TipoTeste {
        return this.tipoTeste
    }

    public get getResultado(): ResultadoTeste {
        return this.resultado
    }

    public set setTipoTeste(novoTipo: TipoTeste) {
        this.tipoTeste = novoTipo
    }

    public set setResultado(novoResultado: ResultadoTeste) {
        this.resultado = novoResultado
    }
}