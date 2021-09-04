const fetch = require('node-fetch');

//Funcion que se encarga de crea un piloto
const crearPiloto = async(req, res) => {
    try {

        //Envia al json la información del piloto a crear
        const resApi = await fetch(`${process.env.BASE_URL}/pilotos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        await resApi.json();

        //Retorna al frontend la confirmación
        res.status(200).json({
            ok: true,
            msg: "Piloto creado"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }
}

//Funcion que se encarga de obtener pilotos
const obtenerPilotos = async(req, res) => {
    try {

        //Obtiene todas los pilotos del archivo json
        const resApi = await fetch(`${process.env.BASE_URL}/pilotos`)
        const pilotos = await resApi.json();

        //Retorna al frontend todos los pilotos
        res.status(200).json({
            ok: true,
            pilotos
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }
}

//Funcion que se encarga de obtener un piloto
const obtenerPiloto = async(req, res) => {
    try {
        //Lee el id de la piloto
        const { id } = req.params;

        //Obtiene el piloto correspondiente al id
        const resApi = await fetch(`${process.env.BASE_URL}/pilotos/?id=${id}`)
        const piloto = await resApi.json();

        //Envia al frontend la areoonave
        res.status(200).json({
            ok: true,
            piloto
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }
}

//Funcion que se encarga de actualizar un piloto
const actualizarPiloto = async(req, res) => {

    try {
        //No permite que se envie el id y se actualice
        delete req.body.id;
        delete req.body.role;

        //Lee el id del piloto que será actualizado
        const { id } = req.params;

        //Envia los datos que serán actualizados
        const resApi = await fetch(`${process.env.BASE_URL}/pilotos/${id}`, {
            method: 'PATH',
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
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }

}

//Funcion que se encarga de borrar un piloto
const borrarPiloto = async(req, res) => {

    try {
        //Lee el id de la areonave que será eliminada
        const { id } = req.params;

        //Se encarga de eliminar la areonave del archivo json
        const resApi = await fetch(`${process.env.BASE_URL}/pilotos/${id}`, { method: 'DELETE' });
        await resApi.json();

        //Envia el mensaje de confirmación
        res.json({
            ok: true,
            msg: 'Piloto eliminado'
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }

}


module.exports = {
    crearPiloto,
    obtenerPilotos,
    obtenerPiloto,
    actualizarPiloto,
    borrarPiloto
}