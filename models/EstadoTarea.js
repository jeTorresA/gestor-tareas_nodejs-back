const {Schema, model} = require('mongoose');

const EstadoTareaSchema = Schema({

    nombre : {
        type : String,
        required : true
    },
    estado : {
        type : String,
        required : true,
        enum : [
            'Activo',
            'Inactivo'
        ]
    },
    fechaCreacion : {
        type : Date,
        reuired : true
    },
    fechaActualizacion : {
        type : Date,
        required : true
    }

});

module.exports = model('EstadoTarea', EstadoTareaSchema);