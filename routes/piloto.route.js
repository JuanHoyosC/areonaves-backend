const router = require('express').Router();
const { validarJWT, validarRol } = require('../middleware/validar-jwt');
const {
    crearPiloto,
    obtenerPilotos,
    obtenerPiloto,
    actualizarPiloto,
    borrarPiloto
} = require('../controllers/piloto.controller');

router.get('/obtener', [validarJWT], obtenerPilotos);
router.get('/obtener/:id', [validarJWT], obtenerPiloto);
router.post('/crear', [validarJWT], crearPiloto);
router.put('/actualizar/:id', [validarJWT], actualizarPiloto);
router.delete('/borrar/:id', [validarJWT], borrarPiloto);


module.exports = router