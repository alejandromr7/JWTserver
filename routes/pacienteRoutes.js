const { Router } = require('express');
const { agregarPaciente, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente } = require('../controller/pacientesController');
const checkAuth = require('../middleware/chechAuth');
const router = Router();

router.route('/').post(checkAuth, agregarPaciente).get(checkAuth, obtenerPacientes);
router.route('/:id').put(checkAuth, actualizarPaciente).get(checkAuth, obtenerPaciente).delete(checkAuth, eliminarPaciente);


module.exports = router;