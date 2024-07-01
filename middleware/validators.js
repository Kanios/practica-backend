const { check, validationResult } = require('express-validator');

const validarComercio = [
  check('nombre').isString().notEmpty().withMessage('El nombre es requerido y debe ser una cadena.'),
  check('cif').isString().notEmpty().withMessage('El CIF es requerido y debe ser una cadena.'),
  check('direccion').isString().notEmpty().withMessage('La dirección es requerida y debe ser una cadena.'),
  check('email').isEmail().withMessage('El email es requerido y debe ser un correo válido.'),
  check('telefono').isString().notEmpty().withMessage('El teléfono es requerido y debe ser una cadena.')
];

const validarContenidoComercio = [
  check('ciudad').isString().notEmpty().withMessage('La ciudad es requerida y debe ser una cadena.'),
  check('actividad').isString().notEmpty().withMessage('La actividad es requerida y debe ser una cadena.'),
  check('titulo').isString().notEmpty().withMessage('El título es requerido y debe ser una cadena.'),
  check('resumen').isString().notEmpty().withMessage('El resumen es requerido y debe ser una cadena.'),
  check('textos').isString().notEmpty().withMessage('Los textos son requeridos y deben ser una cadena.'),
  check('fotos').isArray().withMessage('Las fotos deben ser un array.')
];

const validarRegistro = [
  check('email').isEmail().withMessage('El email es requerido y debe ser un correo válido.'),
  check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
];

const validarLogin = [
  check('email').isEmail().withMessage('El email es requerido y debe ser un correo válido.'),
  check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
];

const validarResultados = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

module.exports = {
  validarComercio,
  validarContenidoComercio,
  validarRegistro,
  validarLogin,
  validarResultados
};