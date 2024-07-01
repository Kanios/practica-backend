const express = require('express');
const comercioController = require('../controllers/comercioController');
const { verifyToken } = require('../middleware/authMiddleware');
const { validarComercio, validarContenidoComercio, validarResultados } = require('../middleware/validators');

const router = express.Router();

/**
 * @swagger
 * /api/comercios/register:
 *   post:
 *     summary: Registrar un nuevo comercio
 *     tags: [Comercio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comercio'
 *     responses:
 *       201:
 *         description: Comercio registrado exitosamente
 *       400:
 *         description: Error al registrar el comercio
 */
router.post('/register', validarComercio, validarResultados, comercioController.registrarComercio);

/**
 * @swagger
 * /api/comercios/upload:
 *   put:
 *     summary: Subir contenido adicional del comercio
 *     tags: [Comercio]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comercio'
 *     responses:
 *       200:
 *         description: Contenido del comercio actualizado
 *       404:
 *         description: Comercio no encontrado
 */
router.put('/upload', verifyToken, validarContenidoComercio, validarResultados, comercioController.subirContenidoComercio);

/**
 * @swagger
 * /api/comercios:
 *   get:
 *     summary: Obtener lista de comercios
 *     tags: [Comercio]
 *     responses:
 *       200:
 *         description: Lista de comercios obtenida exitosamente
 */
router.get('/', comercioController.obtenerComercios);

/**
 * @swagger
 * /api/comercios/{cif}:
 *   get:
 *     summary: Obtener un comercio por su CIF
 *     tags: [Comercio]
 *     parameters:
 *       - in: path
 *         name: cif
 *         schema:
 *           type: string
 *         required: true
 *         description: CIF del comercio
 *     responses:
 *       200:
 *         description: Comercio obtenido exitosamente
 *       404:
 *         description: Comercio no encontrado
 */
router.get('/:cif', comercioController.obtenerComercioPorCIF);

/**
 * @swagger
 * /api/comercios/{cif}:
 *   put:
 *     summary: Actualizar un comercio por su CIF
 *     tags: [Comercio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cif
 *         schema:
 *           type: string
 *         required: true
 *         description: CIF del comercio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comercio'
 *     responses:
 *       200:
 *         description: Comercio actualizado exitosamente
 *       404:
 *         description: Comercio no encontrado
 */
router.put('/:cif', verifyToken, validarComercio, validarResultados, comercioController.actualizarComercio);

/**
 * @swagger
 * /api/comercios/{cif}:
 *   delete:
 *     summary: Borrar un comercio por su CIF
 *     tags: [Comercio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cif
 *         schema:
 *           type: string
 *         required: true
 *         description: CIF del comercio
 *       - in: query
 *         name: borradoLogico
 *         schema:
 *           type: boolean
 *         description: Borrar lógicamente el comercio
 *     responses:
 *       200:
 *         description: Comercio borrado exitosamente
 *       404:
 *         description: Comercio no encontrado
 */
router.delete('/:cif', verifyToken, comercioController.borrarComercio);

/**
 * @swagger
 * /api/comercios/intereses:
 *   get:
 *     summary: Obtener intereses de usuarios
 *     tags: [Comercio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: ciudad
 *         schema:
 *           type: string
 *         required: true
 *         description: Ciudad de los usuarios
 *       - in: query
 *         name: interes
 *         schema:
 *           type: string
 *         required: true
 *         description: Interés de los usuarios
 *     responses:
 *       200:
 *         description: Intereses de usuarios obtenidos exitosamente
 *       404:
 *         description: Comercio no encontrado
 */
router.get('/intereses', verifyToken, comercioController.obtenerInteresesUsuarios);

/**
 * @swagger
 * /api/comercios/{cif}/reviews:
 *   post:
 *     summary: Escribir reseña en un comercio
 *     tags: [Comercio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cif
 *         schema:
 *           type: string
 *         required: true
 *         description: CIF del comercio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comentario:
 *                 type: string
 *                 description: Comentario de la reseña
 *               calificacion:
 *                 type: number
 *                 description: Calificación de la reseña
 *     responses:
 *       201:
 *         description: Reseña creada exitosamente
 *       404:
 *         description: Comercio no encontrado
 */
router.post('/:cif/reviews', verifyToken, comercioController.escribirReseña);

module.exports = router;