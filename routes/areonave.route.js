const router = require('express').Router();
const { validarJWT, validarRol } = require('../middleware/validar-jwt');
const {
    crearAreonave,
    obtenerAreonaves,
    obtenerAreonave,
    actualizarAreonave,
    borrarAreonave
} = require('../controllers/areonave.controller');

router.get('/obtener', [validarJWT, validarRol], obtenerAreonaves);
router.get('/obtener/:id', [validarJWT, validarRol], obtenerAreonave);
router.post('/crear', [validarJWT, validarRol], crearAreonave);
router.put('/actualizar/:id', [validarJWT, validarRol], actualizarAreonave);
router.delete('/borrar/:id', [validarJWT, validarRol], borrarAreonave);


module.exports = router