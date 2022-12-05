var express = require('express');
const router = express.Router();

/*
    Estas dos lineas tambien se pueden hacer así:

    var {Router} = require('express');
    const router = Router();  
    
    
    NOTA:   Aqui solo se importaría el módulo que se necesita de express

*/


router.get('/', (peticion, respuesta) => {
    respuesta.render('index', {title : "home"});
});


module.exports = router;




