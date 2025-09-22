"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTipoPeca = exports.TipoPeca = void 0;
var TipoPeca;
(function (TipoPeca) {
    TipoPeca["NACIONAL"] = "NACIONAL";
    TipoPeca["IMPORTADA"] = "IMPORTADA";
})(TipoPeca || (exports.TipoPeca = TipoPeca = {}));
var isValidTipoPeca = function (value) {
    return Object.values(TipoPeca).includes(value);
};
exports.isValidTipoPeca = isValidTipoPeca;
