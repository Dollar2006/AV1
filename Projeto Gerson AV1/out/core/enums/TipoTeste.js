"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTipoTeste = exports.TipoTeste = void 0;
var TipoTeste;
(function (TipoTeste) {
    TipoTeste["ELETRICO"] = "ELETRICO";
    TipoTeste["HIDRAULICO"] = "HIDRAULICO";
    TipoTeste["AERODINAMICO"] = "AERODINAMICO";
})(TipoTeste || (exports.TipoTeste = TipoTeste = {}));
const isValidTipoTeste = (value) => {
    return Object.values(TipoTeste).includes(value);
};
exports.isValidTipoTeste = isValidTipoTeste;
