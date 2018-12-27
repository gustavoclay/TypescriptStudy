System.register(["../models/Negociacao"], function (exports_1, context_1) {
    "use strict";
    var Negociacao_1, NegociacaoService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Negociacao_1_1) {
                Negociacao_1 = Negociacao_1_1;
            }
        ],
        execute: function () {
            NegociacaoService = class NegociacaoService {
                obterNegociacoes(handler) {
                    return fetch('http://localhost:8080/dados')
                        .then(res => handler(res))
                        .then(res => res.json())
                        .then((dados) => {
                        dados
                            .map(dado => new Negociacao_1.Negociacao(new Date(), dado.vezes, dado.montante));
                    })
                        .catch(err => console.log(err));
                }
            };
            exports_1("NegociacaoService", NegociacaoService);
        }
    };
});
