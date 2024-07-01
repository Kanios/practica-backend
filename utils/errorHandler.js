const manejarErrores = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
};

module.exports = manejarErrores;