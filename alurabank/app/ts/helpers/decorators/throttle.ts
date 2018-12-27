export function throttle(milissegundos = 500) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        let timer = 0;

        descriptor.value = function (...args: any[]) {

            //Solução não funciona no firefox, devolvido para o Negociação Controller - Metodo adiciona
            //if(event) event.preventDefault();

            clearInterval(timer);

            timer = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);

        };

        return descriptor;
    }

}