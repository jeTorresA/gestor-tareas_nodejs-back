const {Router} = require('express');
const router = Router();

const EstadoTarea = require('../models/EstadoTarea');

router.get('/', async (peticion, respuesta) => {

    try {
        const estadosTarea = await EstadoTarea.find();
        respuesta.send(estadosTarea);

    } catch (error) {
        console.log(error);
        return respuesta.status(500).send("Ocurrio un error");
    }
});

router.post('/', async (peticion, respuesta) => {

    try{

        let estadoTarea = new EstadoTarea();

        const existeEstado = await EstadoTarea.findOne({nombre : peticion.body.nombre});
        if(existeEstado){
            return respuesta.status(400).send("Ya existe un estado creado bajo este nombre");
        }

        estadoTarea.nombre = peticion.body.nombre;
        estadoTarea.estado = peticion.body.estado;
        estadoTarea.fechaCreacion = new Date();
        estadoTarea.fechaActualizacion = new Date();

        estadoTarea = await estadoTarea.save();
        respuesta.send(estadoTarea);

    }catch (error){
        console.log(error);
        respuesta.status(500).send("Orrio un error");
    }
});

router.put('/:estadoTareaID', async (peticion, respuesta) => {

    try {
        let estadoTarea = await EstadoTarea.findById(peticion.params.estadoTareaID);
        if(!estadoTarea){
            return respuesta.status(400).send("No existe estado");
        }

        const existeEstadoTarea = await EstadoTarea.findOne({nombre : peticion.body.nombre, _id : {$ne : estadoTarea._id} });
        if (existeEstadoTarea) {
            return respuesta.status(400).send("Ya existe estado");
        }

        estadoTarea.nombre = peticion.body.nombre;
        estadoTarea.estado = peticion.body.estado;
        estadoTarea.fechaActualizacion = new Date();

        estadoTarea = await estadoTarea.save();
        respuesta.send(estadoTarea);

    } catch (error) {
        console.log(error);
        respuesta.status(500).send("Ocurrio un error");
    }
});


module.exports = router;



