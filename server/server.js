require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());


//habilitar la carpeta public

app.use(express.static( path.resolve(__dirname ,'../public')));

//configuracion global de rutas
app.use(require('./routes/index'));

//conexion config.js
mongoose.connect(process.env.URLDB, (err, res) =>{
  
    if (err)  throw err;
    console.log('Base de datos online');
});


app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto', process.env.PORT);
})