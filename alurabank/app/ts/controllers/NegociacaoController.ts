import {MensagemView, NegociacoesView} from "../views/index";
import {Negociacao, Negociacoes, NegociacaoParcial} from "../models/index";
import {domInject} from "../helpers/decorators/domInject";
import {throttle} from "../helpers/decorators/throttle";
import {NegociacaoService} from "../service/NegociacaoService";

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

    private _service = new NegociacaoService();

    constructor() {

        this._negociacoesView.update(this._negociacoes);
    }

    private _isDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.SABADO && data.getDay() != DiaDaSemana.DOMINGO;
    }

    //@throttle() //não funciona no firefox por causa do event implicito
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

    @throttle()
    importaDados() {

        function isOK(res: Response) {

            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }

        }

        this._service.obterNegociacoes(isOK).then(negociacoes => {

            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._negociacoesView.update(this._negociacoes);
        });


    }//ImportaDados


} //NegociacaoController


enum DiaDaSemana {

    DOMINGO, SEGUNDA, TERCA, QUARTA, QUINTA, SEXTA, SABADO
}