const db = require("../../DB/mysql");

const TABLA = "usuarios";
const authen = require('../auth');


module.exports = function (dbInyectada) {

    let db = dbInyectada;

    if(!db) {
        db = require('../../DB/mysql');
    }

    function todos() {
        return db.todos(TABLA);
    }
    function uno(id) {
        return db.uno(TABLA, id);
    }

    async function agregar(body) {
        const usuario = {
            id: body.id,
            nombre: body.nombre,
            cumpleanos: body.cumpleanos,
            apellido: body.apellido,
            correo: body.correo,
            direccion: body.direccion
        }
        const respuesta = db.agregar(TABLA, usuario);

        var insertID = 0;
        if(body.id == 0){
            insertID = respuesta.insertID;
        }else{
            insertID = body.id;
        }

        var respuesta2 = '';
        if(body.mobile_phone || body.password){
            respuesta2 = await authen.agregar({
                id: insertID,
                mobile_phone: body.mobile_phone,
                password: body.password,
                apellido: body.apellido,
                correo: body.correo

            })
            return respuesta2;
        }

        return 
    }

    function DeleteUser(body) {
        return db.DeleteUser(TABLA, body);
    }

    return {
        todos,
        uno,
        agregar,
        DeleteUser
    }

};
