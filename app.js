var express = require('express');
var path = require('path');
const cors = require('cors');


var indexRouter = require('./routes/index');
var usuarioRouter = require('./routes/usuario');
const estadoTareaRouter = require('./routes/estadoTarea');
const tareaRouter = require('./routes/tarea');

const {getConnection} = require('./db/db-connection-mongo');
const { join } = require('path');




var app = express();


//implementacion cors
app.use(cors());

/*mongodb://juantorres:<password>@ac-8jfgow2-shard-00-00.iz9gls4.mongodb.net:27017,ac-8jfgow2-shard-00-01.iz9gls4.mongodb.net:27017,ac-8jfgow2-shard-00-02.iz9gls4.mongodb.net:27017/?ssl=true&replicaSet=atlas-q0nusu-shard-0&authSource=admin&retryWrites=true&w=majority*/

//console.log(join(__dirname, 'views'));

getConnection();

//se debe crear un midelword para indicarle al servidor que puede recibir peticiones con datos json
//Parseo JSON
app.use(express.json());

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug'); //motores de plantillas


app.use('/', indexRouter);                // http://localhost/3000
app.use('/usuario', usuarioRouter); // http://localhost:3000/registrarse
app.use('/estadotarea', estadoTareaRouter);
app.use('/tareas', tareaRouter);





var server = app.listen(4000, () => {

    console.log("server linten on port 4000");
});

//module. exports = app;