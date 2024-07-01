const Comercio = require('../models/Comercio');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const manejarErrores = require('../utils/errorHandler');

// Registrar un nuevo comercio
const registrarComercio = async (req, res) => {
  const { nombre, cif, direccion, email, telefono } = req.body;

  // Generar un id de página
  const idPagina = Math.floor(Math.random() * 1000000);

  const comercio = new Comercio({
    nombre,
    cif,
    direccion,
    email,
    telefono,
    idPagina,
    scoring: 0,
    numeroPuntuaciones: 0,
    reseñas: []
  });

  try {
    await comercio.save();

    // Generar el token JWT
    const token = jwt.sign({ id: comercio._id, email: comercio.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, idPagina });
  } catch (error) {
    manejarErrores(res, error);
  }
};

// Subir contenido adicional del comercio
const subirContenidoComercio = async (req, res) => {
  const { ciudad, actividad, titulo, resumen, textos, fotos } = req.body;
  const comercioId = req.userId; // Usar req.userId que se estableció en el middleware verifyToken

  try {
    const comercio = await Comercio.findByIdAndUpdate(
      comercioId,
      { ciudad, actividad, titulo, resumen, textos, fotos },
      { new: true }
    );

    if (!comercio) {
      return res.status(404).json({ error: 'Comercio no encontrado' });
    }

    res.status(200).json(comercio);
  } catch (error) {
    manejarErrores(res, error);
  }
};

const obtenerComercios = async (req, res) => {
  try {
    const { ciudad, actividad, ordenar } = req.query;
    let query = {};

    if (ciudad) {
      query.ciudad = ciudad;
    }

    if (actividad) {
      query.actividad = actividad;
    }

    let comercios = Comercio.find(query);

    if (ordenar === 'scoring') {
      comercios = comercios.sort({ scoring: -1 });
    }
    const result = await comercios.exec();
    res.status(200).json(result);
  } catch (error) {
    manejarErrores(res, error);
  }
};

const obtenerComercioPorCIF = async (req, res) => {
  try {
    const { cif } = req.params;
    const comercio = await Comercio.findOne({ cif });
    if (!comercio) {
      return res.status(404).json({ error: 'Comercio no encontrado' });
    }
    res.status(200).json(comercio);
  } catch (error) {
    manejarErrores(res, error);
  }
};

const actualizarComercio = async (req, res) => {
  try {
    const { cif } = req.params;
    const comercioActualizado = await Comercio.findOneAndUpdate({ cif }, req.body, { new: true });
    if (!comercioActualizado) {
      return res.status(404).json({ error: 'Comercio no encontrado' });
    }
    res.status(200).json(comercioActualizado);
  } catch (error) {
    manejarErrores(res, error);
  }
};

const borrarComercio = async (req, res) => {
  try {
    const { cif } = req.params;
    const { borradoLogico } = req.query;
    if (borradoLogico) {
      const comercio = await Comercio.findOneAndUpdate({ cif }, { borrado: true }, { new: true });
      if (!comercio) {
        return res.status(404).json({ error: 'Comercio no encontrado' });
      }
      res.status(200).json({ message: 'Comercio borrado lógicamente' });
    } else {
      const comercio = await Comercio.findOneAndDelete({ cif });
      if (!comercio) {
        return res.status(404).json({ error: 'Comercio no encontrado' });
      }
      res.status(200).json({ message: 'Comercio borrado físicamente' });
    }
  } catch (error) {
    manejarErrores(res, error);
  }
};

const obtenerInteresesUsuarios = async (req, res) => {
  const { ciudad, interes } = req.query;

  try {
    const comercioId = req.userId;

    const comercio = await Comercio.findById(comercioId);
    if (!comercio) {
      return res.status(404).json({ error: 'Comercio no encontrado' });
    }

    const usuarios = await User.find({
      ciudad,
      intereses: { $in: [interes] },
      permiteRecibirOfertas: true
    }).select('email');

    const emails = usuarios.map(usuario => usuario.email);
    res.status(200).json(emails);
  } catch (error) {
    manejarErrores(res, error);
  }
};

const escribirReseña = async (req, res) => {
  const { comentario, calificacion } = req.body;
  const { cif } = req.params;

  try {
    const comercio = await Comercio.findOne({ cif });
    if (!comercio) {
      return res.status(404).json({ error: 'Comercio no encontrado' });
    }

    const reseña = {
      usuario: req.userId,
      comentario,
      calificacion
    };

    comercio.reseñas.push(reseña);
    comercio.numeroPuntuaciones += 1;
    comercio.scoring = (comercio.scoring + calificacion) / comercio.numeroPuntuaciones;

    await comercio.save();

    res.status(201).json(comercio);
  } catch (error) {
    manejarErrores(res, error);
  }
};

module.exports = {
  registrarComercio,
  subirContenidoComercio,
  obtenerComercios,
  obtenerComercioPorCIF,
  actualizarComercio,
  borrarComercio,
  obtenerInteresesUsuarios,
  escribirReseña
};