export enum TipoPeca {
    NACIONAL = 'NACIONAL',
    IMPORTADA = 'IMPORTADA'
}

export const isValidTipoPeca = (value:string) : boolean => {
    return Object.values(TipoPeca).includes(value as TipoPeca);
}

