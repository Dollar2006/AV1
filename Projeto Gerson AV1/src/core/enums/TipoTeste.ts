export enum TipoTeste {
    ELETRICO = 'ELETRICO',
    HIDRAULICO = 'HIDRAULICO',
    AERODINAMICO = 'AERODINAMICO'
}

export const isValidTipoTeste = (value:string) : boolean => {
    return Object.values(TipoTeste).includes(value as TipoTeste);
}
