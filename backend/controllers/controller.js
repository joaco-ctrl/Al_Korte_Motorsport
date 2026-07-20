
const loginservice = require("../service/login");
const bcrypt = require("bcrypt");
const auth = require("../auth/auth");


//LOGIN
function login(req, res) {
    const { email, password, pass } = req.body;
    const passwordValue = pass ?? password;

    loginservice.login({ email, pass: passwordValue }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (!results || results.length === 0) {
            return res.status(404).json({ error: "Email no encontrado" });
        }

        const hashAlmacenado = results[0].pass;
        if (!hashAlmacenado) {
            return res.status(500).json({ error: "Usuario sin contraseña registrada" });
        }

        bcrypt.compare(passwordValue, hashAlmacenado, (err, resultado) => {
            if (err) {
                return res.status(500).json({ error: "Error al verificar contraseña" });
            }
            if (resultado) {
                auth.setUsuario(results[0]);
                res.json({ mensaje: "Login exitoso", usuario: { email: results[0].email, id: results[0].id } });
            } else {
                res.status(401).json({ error: "Contraseña incorrecta" });
            }
        });
    });
}

function registro(req, res) {
    const { email, password, pass } = req.body;
    const passwordValue = pass ?? password;

    bcrypt.hash(passwordValue, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: "Error al encriptar contraseña" });
        }
        loginservice.registro({ email, pass: hash }, (err, results) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({ mensaje: "Registro exitoso" });
        });
    });
}
//FIN LOGIN

module.exports = {
   login,
    registro
};
