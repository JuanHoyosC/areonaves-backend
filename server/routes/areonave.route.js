const router = require('express').Router();
const { validarJWT, validarRol } = require('../middleware/validar-jwt');
const {
    crearAreonave,
    obtenerAreonaves,
    obtenerAreonave,
    actualizarAreonave,
    borrarAreonave,
    alquilarAreonave,
    devolverAreonave
} = require('../controllers/areonave.controller');

router.get('/obtener', [validarJWT], obtenerAreonaves);
router.get('/obtener/:id', [validarJWT], obtenerAreonave);
router.post('/crear', [validarJWT, validarRol], crearAreonave);
router.put('/actualizar/:id', [validarJWT, validarRol], actualizarAreonave);
router.put('/alquilar/:id', [validarJWT], alquilarAreonave);
router.put('/devolver/:id', [validarJWT], devolverAreonave);

router.delete('/borrar/:id', [validarJWT, validarRol], borrarAreonave);


module.exports = router