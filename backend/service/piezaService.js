const conexion = require("../database");

function obtenerPiezas(callback) {
    conexion.query("SELECT * FROM piezas", callback);
}

function buscarPiezas(data, callback) {
    const id = Number(data.id);

    if (!id || id > 50000) {
        return callback(new Error("Datos invalidos"));
    }

    conexion.query("SELECT * FROM piezas WHERE id = ?", [id], callback);
}

function crearPieza(data, callback) {
    const { nombre, hp, torque, agarre, precio, categoria_id } = data;
    if (!nombre || hp === undefined || torque === undefined || agarre === undefined || precio === undefined || categoria_id === undefined) {
        return callback(new Error("Datos invalidos"));
    }

    conexion.query(
        "INSERT INTO piezas (nombre, hp, torque, agarre, precio, categoria_id) VALUES (?, ?, ?, ?, ?, ?)",
        [nombre, hp, torque, agarre, precio, categoria_id],
        callback
    );
}

function actualizarPieza(id, data, callback) {
    const { nombre, hp, torque, agarre, precio, categoria_id } = data;

    if (!nombre || hp === undefined || torque === undefined || agarre === undefined || precio === undefined || categoria_id === undefined) {
        return callback(new Error("Datos invalidos"));
    }

    conexion.query(
        "UPDATE piezas SET nombre = ?, hp = ?, torque = ?, agarre = ?, precio = ?, categoria_id = ? WHERE id = ?",
        [nombre, hp, torque, agarre, precio, categoria_id, id],
        callback
    );
}

function eliminarPieza(id, callback) {
    if (!id || id > 50000) {
        return callback(new Error("Datos invalidos"));
    }

    conexion.query("DELETE FROM piezas WHERE id = ?", [id], callback);
}


module.exports = {
    obtenerPiezas,
    crearPieza,
    actualizarPieza,
    eliminarPieza,
    buscarPiezas,
};