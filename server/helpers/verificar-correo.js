const fetch = require('node-fetch');
const verificarCorreo = async(correo) => {
    //Obtiene todas los usuarios del archivo json
    const resApi = await fetch(`${process.env.BASE_URL}/usuarios`)
    const usuarios = await resApi.json();

    const verificar = usuarios.filter(usuario => usuario.correo === correo);

    console.log(verificar, usuarios);

    return verificar.length !== 0 ? true : false


}

module.exports = {
    verificarCorreo
}