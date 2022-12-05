const {Schema, model} = require ('mongoose');

const TareaSchema = Schema({

    nombre : {
        type : String,
        required : true
    },
    descripcion : {
        type : String,
        required : true
    },
    usuario : {
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : true
    },
    estado : {
        type : Schema.Types.ObjectId,
        ref : 'EstadoTarea',
        required : true
    },
    fechaCreacion : {
        type : Date,
        required : true
    },
    fechaActualizacion : {
        type : Date,
        required : true
    } 

});

module.exports = model('Tarea', TareaSchema);