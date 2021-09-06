const jwt = require('jsonwebtoken');


//Se encarga de generar un JWT con la clave privada
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject("Hubo un error generando el JWT");
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT
}