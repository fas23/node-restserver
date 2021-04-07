
const express = require('express');
let {verificaToken, verificaAdmin_Role} = require('../middlewares/autenticacion') ;

let app = express();

let Categoria = require('../models/categoria');

/* 
MOSTRAR TODAS LAS CATEGORIAS
*/

app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        //ordena la coleccion
        .sort('descripcion')
        //cargar datos de otra tabla
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            })
        });
});

/* 
MOSTRAR categoria por ID
*/

app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Categoria.findById(id,(err, categoriaDB)=> {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                err : {
                    message: 'Categoria no encontrada'
                }
            });
        }

        //si la crea mandomos una respuesta
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    
    });
    
});

/* 
CREAR UNA NUEVA CATEGORIA
*/

app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion : body.descripcion,
        usuario : req.usuario._id //el usuario va el verificaToken
    });

    categoria.save((err, categoriaDB) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        //si no se creo
        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //si la crea mandomos una respuesta
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });


});

/* 
ACTUALIZA LA CATEGORIA
*/

app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let desCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, desCategoria, {new : true, runValidators: true}, (err, categoriaDB) =>{ 
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        //si no se creo
        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //si la crea mandomos una respuesta
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });

});

/* 
BORRA UNA CATEGORIA fisicamente
*/

app.delete('/categoria/:id',[verificaToken, verificaAdmin_Role], (req, res) => {
    //SOLO UN ADMINISTRADOR PUEDE BORRAR UNA CATEGORIA
    let id = req.params.id;
    Categoria.findByIdAndRemove(id,(err, categoriaBorrada) => {
        if(err){
            return resp.json({
                ok: false,
                err
            })
        }

        if(!categoriaBorrada){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'categoria no encontrada'
                }
            });
        }

        res.json({
            ok : true,
            usuario : categoriaBorrada
        });

        
    })
});


module.exports = app;