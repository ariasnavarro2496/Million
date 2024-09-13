const express = require('express');

const seguridad = require('./seguridad')
const respuesta = require('../../red/respuestas');
const controlador = require('./index');

const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.delete('/',  DeleteUser);

//Rutas
async function todos(req, res, next) {
    try {
        const items = await controlador.todos();
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }

};

async function uno(req, res, next) {
    try {
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }

};
async function agregar(req, res, next) {
    try {
        const items = await controlador.agregar(req.body);
        if(req.body.id == 0) {
            mensaje = 'Guardado con exito';
        } else {
            mensaje = 'Actualizado con exito';
        }
        respuesta.success(req, res, mensaje, 200);
    } catch (err) {
        next(err);
    }

};

async function DeleteUser(req, res, next) {
    try {
        const items = await controlador.DeleteUser(req.body);
        respuesta.success(req, res, 'Eliminado satisfactoriamente', 200);
    } catch (err) {
        next(err);
    }

};



module.exports = router;