const router = require('express').Router();
const { login } = require('../controllers/admin.controller');

router.post('/login', login);


module.exports = router