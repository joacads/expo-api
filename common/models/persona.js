'use strict';

module.exports = function (Persona) {
    Persona.observe('before save', function (ctx, next) {
        if (ctx.isNewInstance !== undefined) {
            ctx.instance.fechaCreacion = new Date();
        }
        next();
    });

    Persona.promedioEdades = function (callback) {
        let promedio = 0;
        Persona.find().then(response => {
            response.forEach(element => {
                console.log(element.edad)
                promedio += element.edad;
            });
            promedio = promedio / response.length;
            console.log(promedio);
            callback(null, promedio);
        })
    };
};
