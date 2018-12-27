import {MensagemView, NegociacoesView} from "../views/index";
import {Negociacao, Negociacoes} from "../models/index";
import {domInject} from "../helpers/decorators/domInject";

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor() {

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