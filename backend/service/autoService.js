const conexion = require("../database");

function obtenerAutos(callback) {
    conexion.query("SELECT * FROM autos", callback);
}

function buscarAutos(data, callback) {
    const id = Number(data.id);

    if (!id || id > 50000) {
        return callback(new Error("Datos invalidos"));
    }

    conexion.query("SELECT * FROM autos WHERE id = ?", [id], callback);
}

function crearAuto(data, callback) {
    const { nombre, hp, torque, agarre, precio, rareza_id } = data;
    if (!nombre || hp === undefined || torque === undefined || agarre === undefined || precio === undefined || rareza_id === undefined) {
        return callback(new Error("Datos invalidos"));
    }

    conexion.query(
        "INSERT INTO autos (nombre, hp, torque, agarre, precio, rareza_id) VALUES (?, ?, ?, ?, ?, ?)",
        [nombre, hp, torque, agarre, precio, rareza_id],
        callback
    );
}

function actualizarAuto(id, data, callback) {
    const { nombre, hp, torque, agarre, precio, rareza_id } = data;

    if (!nombre || hp === undefined || torque === undefined || agarre === undefined || precio === undefined || rareza_id === undefined) {
        return callback(new Error("Datos invalidos"));
    }

    conexion.query(
        "UPDATE autos SET nombre = ?, hp = ?, torque = ?, agarre = ?, precio = ?, rareza_id = ? WHERE id = ?",
        [nombre, hp, torque, agarre, precio, rareza_id, id],
        callback
    );
}

function eliminarAuto(id, callback) {
    if (!id || id > 50000) {
        return callback(new Error("Datos invalidos"));
    }

    conexion.query("DELETE FROM autos WHERE id = ?", [id], callback);
}


module.exports = {
    obtenerAutos,
    crearAuto,
    actualizarAuto,
    eliminarAuto,
    buscarAutos,
};