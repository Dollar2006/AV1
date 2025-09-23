"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidStatusEtapa = exports.StatusEtapa = void 0;
var StatusEtapa;
(function (StatusEtapa) {
    StatusEtapa["PENDENTE"] = "PENDENTE";
    StatusEtapa["ANDAMENTO"] = "ANDAMENTO";
    StatusEtapa["CONCLUIDA"] = "CONCLUIDA";
})(StatusEtapa || (exports.StatusEtapa = StatusEtapa = {}));
const isValidStatusEtapa = (value) => {
    return Object.values(StatusEtapa).includes(value);
};
exports.isValidStatusEtapa = isValidStatusEtapa;
