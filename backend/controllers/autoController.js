const gameservice = require("../service/autoService");

function buscarAutos(req, res) {
    const { id } = req.params;

    gameservice.buscarAutos({ id }, (err, results) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!results.length) {
            return res.status(404).json({ error: "Auto no encontrado" });
        }

        res.json(results[0]);
    });
}

function obtenerAutos(req, res) {
    gameservice.obtenerAutos((err, results) => {
        if (err) {
            res.status(500).json({ error: "error" });
        } else {
            res.json(results);
        }
    });
}

function crearAuto(req, res) {
    const nombre = req.body.nombre;
    const hp = req.body.hp ?? req.body.HP;
    const torque = req.body.torque ?? req.body.Torque;
    const agarre = req.body.agarre ?? req.body.Agarre;
    const precio = req.body.precio ?? req.body.Precio;
    const rareza_id = req.body.rareza_id ?? req.body.rarezaId ?? req.body.rareza;

    gameservice.crearAuto({ nombre, hp, torque, agarre, precio, rareza_id }, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(201).json({ mensaje: "auto creado correctamente" });
        }
    });
}

function actualizarAuto(req, res) {
    const nombre = req.body.nombre;
    const hp = req.body.hp ?? req.body.HP;
    const torque = req.body.torque ?? req.body.Torque;
    const agarre = req.body.agarre ?? req.body.Agarre;
    const precio = req.body.precio ?? req.body.Precio;
    const rareza_id = req.body.rareza_id ?? req.body.rarezaId ?? req.body.rareza;
    const { id } = req.params;

    gameservice.actualizarAuto(id, { nombre, hp, torque, agarre, precio, rareza_id }, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ mensaje: "Auto actualizado correctamente" });
        }
    });
}

function eliminarAuto(req, res) {
    const { id } = req.params;
    gameservice.eliminarAuto(id, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ mensaje: "Auto borrado correctamente" });
        }
    });
}

module.exports = {
    obtenerAutos,
    crearAuto,
    actualizarAuto,
    eliminarAuto,
    buscarAutos,
};