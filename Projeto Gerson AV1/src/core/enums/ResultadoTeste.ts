export enum ResultadoTeste {
    APROVADO = 'APROVADO',
    REPROVADO = 'REPROVADO',
}
export const isValidResultadoTeste = (value:string) : boolean => {
    return Object.values(ResultadoTeste).includes(value as ResultadoTeste);
}
