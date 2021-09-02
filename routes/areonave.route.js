const router = require('express').Router();
const { validarJWT } = require('../middleware/validar-jwt');
const {
    crearAreonave,
    obtenerAreonaves,
    obtenerAreonave,
    actualizarAreonave,
    borrarAreonave
} = require('../controllers/areonave.controller');

router.get('/obtener', validarJWT, obtenerAreonaves);
router.get('(obtener/:id', validarJWT, obtenerAreonave);
router.post('/crear', validarJWT, crearAreonave);
router.put('/actualizar:id', validarJWT, actualizarAreonave);
router.delete('/borrar/:id', validarJWT, borrarAreonave);


module.exports = router