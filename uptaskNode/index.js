const express = require('express');
//importar la libreria path
const path = require('path');//path es una libreria que nos alluda con las rutas del file sistem
const bodyParser = require('body-parser');//libreria que ayuda a leer datos enviados desde el method post 
//importando el/los helpers
const helpers = require('./src/helpers/helpers')
const routes = require('./src/routes');


//conectarse a la DB
const db = require('./src/config/db');

    //importar los modelos
require('./src/models/Proyectos');
db.sync()
    .then(()=>{
       console.log('conectado al server') 
    })
    .catch(error => console.log(error));


//crear una instancia app de express
const app = express();

//cargando los archivos estaticos
app.use(express.static('public'));


//habilitar el template engine
app.set(
    'view engine' , 
    'pug'
);


//añadir la carpeta de las vistas
app.set(
    'views', 
    path.join(__dirname, './src/views')
);

//pasar el var dom a la app
app.use((req, resp, next)=>{
    resp.locals.vardump = helpers.vardump
    next();
});

//pasando el año
app.use((req,resp,next)=>{
    const fecha = new Date();
    resp.locals.year = fecha.getFullYear();
    next()
})

// habilitar el body parse para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

//rutas
app.use('/', routes());


let port = 7000
app.listen(port);
console.log(`run inport ${port}`)