const fetch = require('node-fetch');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res) => {

    const { correo, password } = req.body;
    console.log(correo, password)
    const resApi = await fetch(`${process.env.BASE_URL}/administrador`);
    const data = await resApi.json();

    if (correo !== data.correo) {
        return res.status(400).json({
            ok: false,
            msg: "Correo electronico incorrecto"
        })
    }

    if (password !== data.password) {
        return res.status(400).json({
            ok: false,
            msg: "Contraseña incorrecta"
        })
    }

    delete data.password;
    const token = await generarJWT(data);

    res.json({
        data,
        token
    })

}



module.exports = {
    login
}