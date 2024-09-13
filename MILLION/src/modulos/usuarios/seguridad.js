const autenticacion = require("../../autenticacion")

module.exports = function chequearAuth() {
    function middleware(req, res, next) {
        autenticacion.chequearToken.confirmarToken(req)
        next();
    }
    return middleware;
}
