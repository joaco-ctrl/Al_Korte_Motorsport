const conexion = require("../database");
function login(data, callback) {
    const { email, pass } = data;
    if (!email || !pass) {
        return callback(new Error("Datos invalidos"));
    }
    else {
        conexion.query(
            "SELECT * FROM usuarios WHERE email = ?",
            [email],
            callback
        );
    }
}

function registro(data, callback) {
    const { email, pass } = data;
    if (!email || !pass) {
        return callback(new Error("Datos invalidos"));
    }
    else {
        conexion.query(
            "INSERT INTO usuarios (email, pass) VALUES (?, ?)",
            [email, pass],
            callback
        );
    }
}

module.exports = {
    login,
    registro
};

