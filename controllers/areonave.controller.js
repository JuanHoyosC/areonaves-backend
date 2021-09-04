const fetch = require('node-fetch');

//Funcion que se encarga de crear una areonave
const crearAreonave = async(req, res) => {

    try {

        //Envia al json la información de la areonave a crear
        const resApi = await fetch(`${process.env.BASE_URL}/areonaves`, {
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
            msg: 'Areonave creada'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }

}


//Funcion que se encarga de obtener todas las areonaves creadas
const obtenerAreonaves = async(req, res) => {
    try {

        //Obtiene todas las areonaves del archivo json
        const resApi = await fetch(`${process.env.BASE_URL}/areonaves`)
        const areonaves = await resApi.json();

        //Retorna al frontend todas las areonaves
        res.status(200).json({
            ok: true,
            areonaves
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }

}

//Funcion que se encarga de obtener una areonave por su id
const obtenerAreonave = async(req, res) => {

    try {
        //Lee el id de la areonave
        const { id } = req.params;

        //Obtiene la areonave correspondiente al id
        const resApi = await fetch(`${process.env.BASE_URL}/areonaves/?id=${id}`)
        const areonaves = await resApi.json();

        //Envia al frontend la areoonave
        res.status(200).json({
            ok: true,
            areonaves
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }

}


//Funcion que se encarga de actualizar una areonave seleccionada
const actualizarAreonave = async(req, res) => {

    try {
        //No permite que se envie el id y se actualice
        delete req.body.id

        //Lee el id de la areonave que será actualizada
        const { id } = req.params;

        //Envia los datos que serán actualizados
        const resApi = await fetch(`${process.env.BASE_URL}/areonaves/${id}`, {
            method: 'PATH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(res.body)
        });

        await resApi.json();
        res.status(200).json({
            ok: true,
            msg: "Areonave actualiza"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }

}

//Funcion que se encarga de eliminar una areonave por su id
const borrarAreonave = async(req, res) => {

    try {
        //Lee el id de la areonave que será eliminada
        const { id } = req.params;

        //Se encarga de eliminar la areonave del archivo json
        const resApi = await fetch(`${process.env.BASE_URL}/areonaves/${id}`, { method: 'DELETE' });
        await resApi.json();

        //Envia el mensaje de confirmación
        res.json({
            ok: true,
            msg: 'Areonave eliminada'
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }

}

module.exports = {
    crearAreonave,
    obtenerAreonave,
    obtenerAreonaves,
    actualizarAreonave,
    borrarAreonave
}