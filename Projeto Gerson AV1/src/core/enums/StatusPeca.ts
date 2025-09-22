export enum StatusPeca {
    EM_PRODUCAO = 'EM_PRODUCAO',
    EM_TRANSPORTE = 'EM_TRANSPORTE',
    PRONTA = 'PRONTA'
}
export const isValidStatusPeca = (value:string) : boolean => {
    return Object.values(StatusPeca).includes(value as StatusPeca);
}
