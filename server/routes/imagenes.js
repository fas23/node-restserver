//servicio para mostrar las imagenes 
const express = require('express');
const {verificaTokenImg} = require('../middlewares/autenticacion');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen);
    }else{
        let noImgPath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(noImgPath);

    }

    
});








module.exports = app;
