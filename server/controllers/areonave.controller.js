const fetch = require('node-fetch');
const { actualizar } = require('../helpers/actualizar');

//Funcion que se encarga de crear una areonave
const crearAreonave = async(req, res) => {

    try {

        //Valores por defecto
        const nuevaAreonave = {
            "ubicacion": "Luna",
            "llegada": "2021-09-22",
            "salida": "2021-08-22",
            "pasajeros": 10,
            "reservado": false,
        }

        //Envia al json la información de la areonave a crear
        const resApi = await fetch(`${process.env.BASE_URL}/areonaves`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaAreonave)
        });
        const areonave = await resApi.json();

        //Retorna al frontend la confirmación
        res.status(200).json({
            ok: true,
            msg: 'Areonave creada',
            areonave
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

        console.log(id)

        //Obtiene la areonave correspondiente al id
        const resApi = await fetch(`${process.env.BASE_URL}/usuarios/?id=${id}`)
        const [usuario] = await resApi.json();

        console.log(usuario)

        const areonaves = usuario.areonaves;

        //Envia al frontend la areoonave
        res.status(200).json({
            ok: true,
            areonaves
        })
    } catch (error) {
        console.log(error)
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

        //Retorna los datos que serán actualizados segun lo enviado por el frontend
        const newData = await actualizar(`${process.env.BASE_URL}/areonaves/?id=${id}`, req.body);

        //Envia los datos que serán actualizados
        const resApi = await fetch(` ${ process.env.BASE_URL }/areonaves/${ id }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });

        //Envia un mensaje de confirmación al frontend
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
        const resApi = await fetch(`${process.env.BASE_URL }/areonaves/${ id }`, { method: 'DELETE' });
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


//Funcion que se encarga de alquilar una areonave
const alquilarAreonave = async(req, res) => {
    try {

        //Lee el id del Usuario que será actualizado
        const { id } = req.params;
        const { areonaveId } = req.body;
        delete req.body.areonaveId;
        req.body.reservado = true;

        //Obtiene el Usuario que será actualizado para añadirle la areonave
        const resUsuario = await fetch(`${process.env.BASE_URL}/usuarios/?id=${id}`);
        const [dataUsuario] = await resUsuario.json();


        const dataAreonave = await actualizar(`${process.env.BASE_URL}/areonaves/?id=${areonaveId}`, req.body)

        //Verifica si el Usuario tiene areonaves, si no crea un array
        if (!dataUsuario.areonaves) dataUsuario.areonaves = [];

        //Agrega la areonave al Usuario
        dataUsuario.areonaves.push(dataAreonave);

        //Actualiza la areonave que fue alquilada
        const resApiAreonave = await fetch(`${process.env.BASE_URL}/areonaves/${areonaveId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataAreonave)
        });

        await resApiAreonave.json();

        //Añade la areonave al usuario
        const resApi = await fetch(`${process.env.BASE_URL}/usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUsuario)
        });

        await resApi.json();

        //Retorna una respuesta de confirmación al frontend
        res.status(200).json({
            ok: true,
            msg: 'Areonave alquilada con exito',
            areonave: dataAreonave
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el servidor'
        })
    }
}


//Funcion que se encarga de devolver una areonave
const devolverAreonave = async(req, res) => {
    try {

        //Lee el id del Usuario que será actualizado
        const { id } = req.params;
        const { idAreonave } = req.body;
        delete req.body.idAreonave
        req.body.reservado = false;

        //Obtiene el Usuario que será actualizado para añadirle la areonave
        const resUsuario = await fetch(`${process.env.BASE_URL}/usuarios/?id=${id}`);
        const [dataUsuario] = await resUsuario.json();


        //Pone la nave en finalizada
        dataUsuario.areonaves = dataUsuario.areonaves.map(areonave => {
            return (areonave.id === idAreonave) ? ({...areonave, reservado: false }) : areonave;
        })

        //Actualiza la areonave enviada por el frontend y la coloca disponible
        const resAreonave = await fetch(`${process.env.BASE_URL}/areonaves/?id=${idAreonave}`)
        const [dataAreonave] = await resAreonave.json();
        dataAreonave.reservado = false;

        //Se libera la areonave en el archivo json
        const resApiAreonave = await fetch(`${process.env.BASE_URL}/areonaves/${idAreonave}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataAreonave)
        });

        await resApiAreonave.json();

        //Se libera la areonave por parte del usuario
        const resApi = await fetch(`${process.env.BASE_URL}/usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUsuario)
        });

        await resApi.json();

        //Retorna una respuesta de confirmación al frontend
        res.status(200).json({
            ok: true,
            msg: 'Areonave retornada con exito'
        })

    } catch (error) {
        console.log(error)
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
    borrarAreonave,
    alquilarAreonave,
    devolverAreonave
}