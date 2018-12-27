export function LogarTempoDeExecucao(emSegundos: boolean = false) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        descriptor.value = function (...args: any[]) {

            console.log("-------------------TEST------------------");
            console.log(`Metodo: '${propertyKey}' Paramentos: ${JSON.stringify(args)}`);

            let unidade = 'ms';
            let divisor = 1;
            if(emSegundos) {
                unidade = 's';
                divisor = 1000;
            }


            const t1 = performance.now(); //teste de performance

            const retorno = metodoOriginal.apply(this, args);

            const t2 = performance.now(); //teste de performance

            console.log(`Retorno: ${JSON.stringify(retorno)}`);

            console.log(`Tempo de Execução: ${(t2 - t1)/divisor} ${unidade}`); //teste de performance

            return retorno;

        };

        return descriptor;

    }

}