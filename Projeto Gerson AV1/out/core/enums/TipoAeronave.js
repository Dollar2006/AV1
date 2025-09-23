"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTipoAeronave = exports.TipoAeronave = void 0;
var TipoAeronave;
(function (TipoAeronave) {
    TipoAeronave["COMERCIAL"] = "COMERCIAL";
    TipoAeronave["MILITAR"] = "MILITAR";
})(TipoAeronave || (exports.TipoAeronave = TipoAeronave = {}));
const isValidTipoAeronave = (value) => {
    return Object.values(TipoAeronave).includes(value);
};
exports.isValidTipoAeronave = isValidTipoAeronave;
