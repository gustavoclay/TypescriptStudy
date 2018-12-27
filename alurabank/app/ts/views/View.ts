class View {

    protected _elemento: Element;

    constructor(seletor: string) {
        this._elemento = document.querySelector(seletor);
    }


}