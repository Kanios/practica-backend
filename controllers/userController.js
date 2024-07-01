const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const manejarErrores = require('../utils/errorHandler');

const register = async (req, res) => {
  const { email, password, nombre, edad, ciudad, intereses, permiteRecibirOfertas } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = new User({
    email,
    password: hashedPassword,
    nombre,
    edad,
    ciudad,
    intereses,
    permiteRecibirOfertas
  });

  try {
    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    manejarErrores(res, error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'Email o contraseña incorrectos' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Email o contraseña incorrectos' });
  }

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
};

const updateUser = async (req, res) => {
  const userId = req.userId; // Usar req.userId que se estableció en el middleware verifyToken
  const { ciudad, intereses, permiteRecibirOfertas } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { ciudad, intereses, permiteRecibirOfertas },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    manejarErrores(res, error);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.userId;

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    manejarErrores(res, error);
  }
};

module.exports = {
  register,
  login,
  updateUser,
  deleteUser
};