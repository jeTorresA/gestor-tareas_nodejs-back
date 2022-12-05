const {Router} = require('express');
const Tarea = require('../models/Tarea');
const router = Router();

router.get('/', async (peticion, respuesta) => {

    try {

        const tareas = await Tarea.find().populate([
            {
                path : 'usuario', select : 'nombre email estado'
            },
            {
                path : 'estado', select : 'nombre estado'
            }
        ]);
        return respuesta.send(tareas);
    } catch (error) {
        console.log(error);
        return respuesta.status(500).send("Ocurrio un error");
    }   

});

router.post('/', async (peticion, respuesta) => {

    try {

        const tareaExisteConMismoNombre = await Tarea.findOne({nombre : peticion.body.nombre});
        if(tareaExisteConMismoNombre){
            return respuesta.status(400).send("Existe tarea con el mismo nombre");
        }

        let tarea = new Tarea();
        
        tarea.nombre = peticion.body.nombre;
        tarea.descripcion = peticion.body.descripcion;
        tarea.usuario = peticion.body.usuario;
        tarea.estado = peticion.body.estado;
        tarea.fechaCreacion = new Date();
        tarea.fechaActualizacion = new Date();

        tarea = await tarea.save();
        return respuesta.send(tarea);

    } catch (error) {
        console.log(error);
        respuesta.status(500).send("Ocurrio un error");
    }
    
});

router.put('/:tareaID', async (peticion, respuesta) => {

    try {

        let tarea = await Tarea.findById(peticion.params.tareaID);
        if (!tarea) {
            return respuesta.status(400).send("No existe Tarea");            
        }

        const existeOtraTarea = await Tarea.findOne({nombre : peticion.body.nombre, _id : {$ne: tarea._id}});
        if (existeOtraTarea) {
            return respuesta.status(400).send("Ya existe tarea");
        }

        tarea.nombre =  peticion.body.nombre;
        tarea.descripcion = peticion.body.descripcion;
        tarea.estado = peticion.body.estado;
        tarea.usuario = peticion.body.usuario;
        tarea.fechaActualizacion = new Date();

        tarea = await tarea.save();
        respuesta.send(tarea);

    } catch (error) {
        console.log(error);
        respuesta.status(500).send("Ocurrio un error");
    }
});

router.get('/:tareaID', async (peticion, respuesta) => {
    try {
        const tarea = await Tarea.findById(peticion.params.tareaID);
        if (!tarea){
            return respuesta.status(404).send("Tarea No existe");
        }
        respuesta.status(200).send(tarea);
    } catch (error) {
        console.log(error);
        respuesta.status(500).send("Ocurrio un error");
    }
});


module.exports = router;