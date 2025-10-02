export enum TipoAeronave {
  COMERCIAL = 'COMERCIAL',
  MILITAR = 'MILITAR'
}

export const isValidTipoAeronave = (value: string): boolean => {
  return Object.values(TipoAeronave).includes(value as TipoAeronave);
};