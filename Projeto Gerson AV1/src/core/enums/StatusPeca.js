"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidStatusPeca = exports.StatusPeca = void 0;
var StatusPeca;
(function (StatusPeca) {
    StatusPeca["EM_PRODUCAO"] = "EM_PRODUCAO";
    StatusPeca["EM_TRANSPORTE"] = "EM_TRANSPORTE";
    StatusPeca["PRONTA"] = "PRONTA";
})(StatusPeca || (exports.StatusPeca = StatusPeca = {}));
var isValidStatusPeca = function (value) {
    return Object.values(StatusPeca).includes(value);
};
exports.isValidStatusPeca = isValidStatusPeca;
