const {Schema, model}  = require('mongoose');

const UsuarioSchema = Schema({
    nombre : {
        type : String,
        required : true,  //not null
    },
    email : {
        type : String,
        required : true,
        unique : true,  //no pueden existir mas de un registro con el mismo email
    },
    estado : {
        type : String,
        required : true,
        enum : [
            'Activo',
            'Inactivo'
        ],
    },

    fechaCreacion : {
        type : Date,
        required : true,        
    },
    fechaActualizacion : {
        type : Date,
        required : true,
    }
    //cuando se tiene relacion entre dos tablas se hace asi:
    /*
    atributorelacionado : {
        type : Schema.Types.ObjectId,  //dato gestionado por mongoDB y no se puede modificar
        ref : 'ModeloDeReferencia', //nombre del modelo de la clave primary key
        required : <false or true>,
    }

    cuando se va a coonsultar en el metodo GET, se debe agregar lo siguiente en la busquedqa para 
    que dos devuelva la informacion del atributo relacionado desde la otra tabala

    try {
        const nombreDadoADatos = await NombreEsquemaDatos.find().populate([
            {
                path : 'nombreAtributoEnEsquema', select: 'nombre email estado' -> para seleccionar datos a mosntrar de esa tabla  
            },
            {
                path : 'nombreAtributoEnEsquema'
            }, 
            {
                TANTOS OBJETOS COMO ATRIBUTOS REFERENCIADOS SE TENGAN
            }

        ]);

        respuesta.send(nombreDadoADatos);
    }

    */

});


module.exports = model('Usuario', UsuarioSchema);