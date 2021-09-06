const router = require('express').Router();
const { validarJWT, validarRol } = require('../middleware/validar-jwt');
const {
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    borrarUsuario
} = require('../controllers/usuario.controller');

router.get('/obtener', [validarJWT, validarRol], obtenerUsuarios);
router.get('/obtener/:id', [validarJWT], obtenerUsuario);
router.put('/actualizar/:id', [validarJWT, validarRol], actualizarUsuario);
router.delete('/borrar/:id', [validarJWT, validarRol], borrarUsuario);


module.exports = router