'use strict';

var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');

module.exports = function (Persona) {

    var idPersona = 0;


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

    /*
    Persona.on('dataSourceAttached', function () {

        console.log(`CORRECAMINOS ${idPersona}`)
        
        var persona2ToCached = redis.get(`persona_${idPersona}`)
        if (persona2ToCached !== undefined) {
            var override = Persona.findById;
            Persona.findById = function (id, callback) {
                let result = JSON.parse(override.apply(this, arguments))
                redis.set(`persona_${idPersona}`, result)
                persona2ToCached = redis.get(`persona_${idPersona}`)
            }
        }
        return persona2ToCached;
    })
    */
};
