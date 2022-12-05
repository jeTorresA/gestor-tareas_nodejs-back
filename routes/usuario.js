const {Router} = require('express');
const router = Router();

const Usuario = require('../models/Usuario');


router.get('/', async (peticion, respuesta) => {
try {
    
    const usuarios = await Usuario.find();
    respuesta.send(usuarios);

} catch (error) {
    console.log(error);
    respuesta.status(500).send("Ocurrio un error");
}
} );

router.get('/:usuarioId', async (peticion, respuesta) => {
    try {
        
        const usuario = await Usuario.findById(peticion.params.usuarioId);
        if (!usuario) {
            return respuesta.status(400).send("Usuario NO existe.");
        }
        respuesta.status(200).send(usuario);
        
    } catch (error) {
        console.log(error);
        return respuesta.status(500).send("Ocurrio un error. No se pudo consultar el usuario");
    }
});

router.post('/', async (peticion, respuesta) => {
    //peticion trae todos los datos de la solucitud
    //respuesta es todo lo que yo quiero responder a la solicitud

    //respuesta.send('Hola mundo estoy en crear usuario mediante peticion post')
    try{

        console.log(peticion.body);
        //respuesta.send(peticion.body);

        //agregar a la base de datos
        let usuario = new Usuario();
        
        const existeUsuario = await Usuario.findOne({email : peticion.body.email});
        console.log("Respuesta existe usuario", existeUsuario);
        if(existeUsuario){
            return respuesta.status(400).send("email ya existe");
        }

        usuario.nombre = peticion.body.nombre;
        usuario.email = peticion.body.email;
        usuario.estado = peticion.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save(); 
        respuesta.send(usuario);

    }catch (error){
        console.log(error);
        respuesta.status(500).send("Ocurrio un error");
    }    

});

router.put('/:usuarioId', async (peticion, respuesta,) => {
    
    try{

        console.log(peticion.body);
    
        let usuario = await Usuario.findById(peticion.params.usuarioId);

        if(!usuario){
            return respuesta.status(400).send("Usuario No existe");
        }
                
        const existeUsuario = await Usuario
        .findOne({email : peticion.body.email, _id : {$ne : usuario._id}}); //busca si el email no pertenece a otro ususario
        console.log("Respuesta existe usuario", existeUsuario);
        if(existeUsuario){
            return respuesta.status(400).send("email ya existe");
        }

        usuario.email = peticion.body.email;
        usuario.nombre = peticion.body.nombre;
        usuario.estado = peticion.body.estado;
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save(); 
        respuesta.send(usuario);

    }catch (error){
        console.log(error);
        respuesta.status(500).send("Ocurrio un error");
    }    

});




module.exports = router;