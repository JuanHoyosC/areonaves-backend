const fetch = require('node-fetch');
const bcrypt = require('bcryptjs');

const { verificarCorreo } = require('../helpers/verificar-correo');
const { generarJWT } = require('../helpers/jwt');


const login = async(req, res) => {

    try {
        const { correo, password } = req.body;

        //Busca en el archivo json si existe un usuario con el correo recibido
        const resApi = await fetch(`${process.env.BASE_URL}/usuarios/?correo=${correo}`);
        const [usuario] = await resApi.json();


        //Verifica si el correo electronico existe
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Correo electronico incorrecto"
            })
        }

        //Verifica si la contraseña es correcta
        const validarPass = bcrypt.compareSync(password, usuario.password);
        if (!validarPass) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña es invalida"
            })
        }

        //Elimina la contraseña para generar un token
        delete usuario.password;
        const token = await generarJWT(usuario);

        //Envia al frontend la info del usuario y su token
        res.status(200).json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }

}

//Funcion que se encarga de crea un usuario
const crearUsuario = async(req, res) => {
    try {
        const { correo, password } = req.body;

        //Crea valores por defectos del usuario
        req.body.role = 'piloto';
        req.body.areonaves = [];

        //Verifica si el correo se encuentra registrado
        const verificar = await verificarCorreo(correo);

        //Retorna un error al frontend
        if (verificar) {
            return res.status(404).json({
                ok: false,
                msg: "El correo ya se encuentra registrado"
            })
        }

        //Encripta la contraseña para guardarse en el json
        const salt = bcrypt.genSaltSync();
        req.body.password = bcrypt.hashSync(password, salt);


        //Envia al json la información del usuario a crear
        const resApi = await fetch(`${process.env.BASE_URL}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        const newUser = await resApi.json();

        delete newUser.password;

        console.log(newUser, 'dfghjkl')

        //Genera un token que será enviado el frontend
        const token = await generarJWT(newUser);

        //Retorna al frontend la confirmación
        res.status(200).json({
            ok: true,
            usuario: newUser,
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }
}

module.exports = {
    login,
    crearUsuario
}