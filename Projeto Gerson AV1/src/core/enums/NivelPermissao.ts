export enum NivelPermissao {
    ADMNISTRACAO = 'ADMINISTRACAO',
    ENGENHEIRO = 'ENGENHEIRO',
    OPERADOR = 'OPERADOR'
}
export const isValidNivelPermissao = (value:string) : boolean => {
    return Object.values(NivelPermissao).includes(value as NivelPermissao);
}
