const fetch = require('node-fetch');
const { actualizar } = require('../helpers/actualizar');
const { verificarCorreo } = require('../helpers/verificar-correo');




//Funcion que se encarga de obtener usuarios
const obtenerUsuarios = async(req, res) => {
    try {

        //Obtiene todas los usuarios del archivo json
        const resApi = await fetch(`${process.env.BASE_URL}/usuarios`)
        let usuarios = await resApi.json();

        //Elimina las contraseñas de los usuarios
        usuarios = usuarios.map(usuario => {
            delete usuario.password;
            return usuario;
        })

        //Retorna al frontend todos los usuarios
        res.status(200).json({
            ok: true,
            usuarios
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }
}

//Funcion que se encarga de obtener un Usuario
const obtenerUsuario = async(req, res) => {
    try {
        //Lee el id de la Usuario
        const { id } = req.params;

        //Obtiene el Usuario correspondiente al id
        const resApi = await fetch(`${process.env.BASE_URL}/usuarios/?id=${id}`)
        const Usuario = await resApi.json();

        //Envia al frontend la areoonave
        res.status(200).json({
            ok: true,
            Usuario
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }
}

//Funcion que se encarga de actualizar un Usuario
const actualizarUsuario = async(req, res) => {

    try {
        //No permite que se envie el id y se actualice
        delete req.body.id;

        //Lee el id del Usuario que será actualizado
        const { id } = req.params;

        //Retorna los datos que serán actualizados
        const newData = await actualizar(`${process.env.BASE_URL}/usuarios/?id=${id}`, req.body);

        //Envia los datos que serán actualizados
        const resApi = await fetch(`${process.env.BASE_URL}/usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });

        await resApi.json();
        res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }

}

//Funcion que se encarga de borrar un Usuario
const borrarUsuario = async(req, res) => {

    try {
        //Lee el id de la areonave que será eliminada
        const { id } = req.params;

        //Comprueba que no se eliminará el administrador principal
        if (id == 1) {
            return res.status(400).json({
                ok: false,
                msg: 'No puedes borrar al administrador principal'
            })
        }

        //Se encarga de eliminar la areonave del archivo json
        const resApi = await fetch(`${process.env.BASE_URL}/usuarios/${id}`, { method: 'DELETE' });
        await resApi.json();

        //Envia el mensaje de confirmación
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }

}



module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    borrarUsuario
}