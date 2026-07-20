const gameservice = require("../service/piezaService");

function buscarPiezas(req, res) {
    const { id } = req.params;

    gameservice.buscarPiezas({ id }, (err, results) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!results.length) {
            return res.status(404).json({ error: "Pieza no encontrada" });
        }

        res.json(results[0]);
    });
}

function obtenerPiezas(req, res) {
    gameservice.obtenerPiezas((err, results) => {
        if (err) {
            res.status(500).json({ error: "error" });
        } else {
            res.json(results);
        }
    });
}

function crearPieza(req, res) {
    const nombre = req.body.nombre;
    const hp = req.body.hp ?? req.body.HP;
    const torque = req.body.torque ?? req.body.Torque;
    const agarre = req.body.agarre ?? req.body.Agarre;
    const precio = req.body.precio ?? req.body.Precio;
    const categoria_id = req.body.categoria_id ?? req.body.categoriaId;

    gameservice.crearPieza({ nombre, hp, torque, agarre, precio, categoria_id }, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(201).json({ mensaje: "pieza creada correctamente" });
        }
    });
}

function actualizarPieza(req, res) {
    const nombre = req.body.nombre;
    const hp = req.body.hp ?? req.body.HP;
    const torque = req.body.torque ?? req.body.Torque;
    const agarre = req.body.agarre ?? req.body.Agarre;
    const precio = req.body.precio ?? req.body.Precio;
    const categoria_id = req.body.categoria_id ?? req.body.categoriaId;
    const { id } = req.params;

    gameservice.actualizarPieza(id, { nombre, hp, torque, agarre, precio, categoria_id }, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ mensaje: "Pieza actualizada correctamente" });
        }
    });
}

function eliminarPieza(req, res) {
    const { id } = req.params;
    gameservice.eliminarPieza(id, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ mensaje: "Pieza borrada correctamente" });
        }
    });
}

module.exports = {
    obtenerPiezas,
    crearPieza,
    actualizarPieza,
    eliminarPieza,
    buscarPiezas,
};