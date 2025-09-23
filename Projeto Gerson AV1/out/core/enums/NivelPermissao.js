"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidNivelPermissao = exports.NivelPermissao = void 0;
var NivelPermissao;
(function (NivelPermissao) {
    NivelPermissao["ADMNISTRACAO"] = "ADMINISTRACAO";
    NivelPermissao["ENGENHEIRO"] = "ENGENHEIRO";
    NivelPermissao["OPERADOR"] = "OPERADOR";
})(NivelPermissao || (exports.NivelPermissao = NivelPermissao = {}));
const isValidNivelPermissao = (value) => {
    return Object.values(NivelPermissao).includes(value);
};
exports.isValidNivelPermissao = isValidNivelPermissao;
