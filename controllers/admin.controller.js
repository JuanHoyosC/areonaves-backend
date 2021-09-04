const fetch = require('node-fetch');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res) => {

    const { correo, password } = req.body;
    console.log(correo, password)
    const resApi = await fetch(`${process.env.BASE_URL}/administrador`);
    const data = await resApi.json();

    console.log(data, 56)

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


const cambiarRole = async(req, res) => {
    try {
        //No permite que se envie el id y se actualice
        delete req.body.id

        //Lee el id del piloto que será actualizado
        const { id } = req.params;

        //Envia los datos que serán actualizados
        const resApi = await fetch(`${process.env.BASE_URL}/pilotos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(res.body)
        });

        await resApi.json();
        res.status(200).json({
            ok: true,
            msg: 'Piloto actualizado'
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }
}



module.exports = {
    login,
    cambiarRole
}