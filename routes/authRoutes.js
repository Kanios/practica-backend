const express = require('express');
const authController = require('../controllers/authController');
const { validarLogin, validarRegistro, validarResultados } = require('../middleware/validators');

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Admin registrado exitosamente
 *       400:
 *         description: Error al registrar el admin
 */
router.post('/register', validarRegistro, validarResultados, authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión como admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Email o contraseña incorrectos
 */
router.post('/login', validarLogin, validarResultados, authController.login);

module.exports = router;