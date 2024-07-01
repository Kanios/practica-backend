const express = require('express');
const userController = require('../controllers/userController');
const { validarRegistro, validarLogin, validarResultados } = require('../middleware/validators');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error al registrar el usuario
 */
router.post('/register', validarRegistro, validarResultados, userController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión como usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Email o contraseña incorrectos
 */
router.post('/login', validarLogin, validarResultados, userController.login);

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/', verifyToken, userController.updateUser);

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/', verifyToken, userController.deleteUser);

module.exports = router;