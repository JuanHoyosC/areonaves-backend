const router = require('express').Router();
const { login, crearUsuario } = require('../controllers/auth.controller');

router.post('/login', login);
router.post('/registrarse', crearUsuario);


module.exports = router