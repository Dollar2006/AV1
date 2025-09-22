"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var Peca = /** @class */ (function () {
    function Peca(nome, tipo, fornecedor, status) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
    }
    Object.defineProperty(Peca.prototype, "getNome", {
        get: function () {
            return this.nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Peca.prototype, "getTipo", {
        get: function () {
            return this.tipo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Peca.prototype, "getFornecedor", {
        get: function () {
            return this.fornecedor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Peca.prototype, "getStatus", {
        get: function () {
            return this.status;
        },
        enumerable: false,
        configurable: true
    });
    Peca.prototype.atualizarStatus = function (novoStatus) {
        this.status = novoStatus;
    };
    Peca.prototype.salvar = function () {
        var dataDir = path.resolve('data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
        }
        var fileName = "".concat(this.nome.replace(/ /g, '_'), ".json");
        var filePath = path.join(dataDir, fileName);
        var dados = {
            nome: this.nome,
            tipo: this.tipo,
            fornecedor: this.fornecedor,
            status: this.status
        };
        fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
        console.log("Pe\u00E7a salva em ".concat(filePath));
    };
    Peca.prototype.carregar = function (nomeArquivo) {
        var dataDir = path.resolve('data');
        var filePath = path.join(dataDir, "".concat(nomeArquivo, ".json"));
        if (!fs.existsSync(filePath)) {
            console.log("Arquivo ".concat(filePath, " n\u00E3o encontrado."));
            return;
        }
        var dados = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        this.nome = dados.nome;
        this.tipo = dados.tipo;
        this.fornecedor = dados.fornecedor;
        this.status = dados.status;
        console.log("Pe\u00E7a carregada de ".concat(filePath));
    };
    return Peca;
}());
exports.default = Peca;
