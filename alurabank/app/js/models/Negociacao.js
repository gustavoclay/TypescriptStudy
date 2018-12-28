System.register(["./Imprimivel"], function (exports_1, context_1) {
    "use strict";
    var Imprimivel_1, Negociacao;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Imprimivel_1_1) {
                Imprimivel_1 = Imprimivel_1_1;
            }
        ],
        execute: function () {
            Negociacao = class Negociacao extends Imprimivel_1.Imprimivel {
                constructor(data, quantidade, valor) {
                    super();
                    this.data = data;
                    this.quantidade = quantidade;
                    this.valor = valor;
                }
                get volume() {
                    return this.quantidade * this.valor;
                }
                paraTexto() {
                    console.log(`Data: ${this.data}
            Quantidade: ${this.quantidade},
            Valor: ${this.valor},
            Volume: ${this.volume}`);
                }
            };
            exports_1("Negociacao", Negociacao);
        }
    };
});
