export enum StatusEtapa {
    PENDENTE = 'PENDENTE',
    ANDAMENTO = 'ANDAMENTO',
    CONCLUIDA = 'CONCLUIDA'
}
export const isValidStatusEtapa = (value:string) : boolean => {
    return Object.values(StatusEtapa).includes(value as StatusEtapa);
}
