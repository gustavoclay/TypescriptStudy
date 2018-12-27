import {NegociacoesView, MensagemView} from "../views/index";
import {Negociacoes, Negociacao} from "../models/index";

export class NegociacaoController {

    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor() {

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoesView.update(this._negociacoes);
    }

    private _isDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.SABADO && data.getDay() != DiaDaSemana.DOMINGO;
    }

    adiciona(event: Event) {

        event.preventDefault();

        /*
        * Checagem de negociações fora de dias úteis
        */
        let data = new Date(this._inputData.val().replace(/-/g, '/'));
        if (!this._isDiaUtil(data)) {

            this._mensagemView.update('Só é permitido negociações somente em dias úteis.');
            return
        }


        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso.');

    }
}


enum DiaDaSemana {

    DOMINGO, SEGUNDA, TERCA, QUARTA, QUINTA, SEXTA, SABADO
}