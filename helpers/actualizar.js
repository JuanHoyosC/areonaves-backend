const fetch = require('node-fetch');

const actualizar = async(url, newData) => {
    //Obtiene los datos del piloto
    const res = await fetch(url)
    const [data] = await res.json();

    for (const key in newData) {
        data[key] = newData[key];
    }

    return data;
}


module.exports = { actualizar }