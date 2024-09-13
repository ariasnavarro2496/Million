const db = require("../../DB/mysql");
const authen = require('../../autenticacion')

const TABLA = "authen";
const bcrypt = require('bcrypt')


module.exports = function (dbInyectada) {

    let db = dbInyectada;

    if (!db) {
        db = require('../../DB/mysql');
    }

    async function login(mobile_phone, password) {
        const data = await db.query(TABLA, { mobile_phone: mobile_phone });
    
        return bcrypt.compare(password, data.password)
        .then(resultado => {
            if(resultado === true) {
                //Generamos token
                return authen.asignarToken({...data})
            } else {
                throw new Error('Datos invalidos');
            }
        })
    }

    async function agregar(data) {
        const authData = {
            id: data.id,
            mobile_phone: data.mobile_phone
        }
        if (data.mobile_phone) {
            
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password.toString(), 5);
        }

        return db.agregar(TABLA, authData);
    }



    return {
        agregar,
        login
    }

};
