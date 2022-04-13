const { Router } = require('express');
const router = Router();
const { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil } = require('../controller/usuariosController');
const chechAuth = require('../middleware/chechAuth');

router.post('/', registrar);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar); // Confirmar cuenta
router.post('/olvide-password', olvidePassword); // Mandar correo via email
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword); // Validar Token y cambiar el password
router.get('/perfil', chechAuth, perfil);

module.exports = router;