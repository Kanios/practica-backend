const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/mongo');
const comercioRoutes = require('./routes/comercioRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

dotenv.config();  // Asegúrate de que esta línea esté antes de cualquier uso de variables de entorno

const app = express();
const port = process.env.PORT || 3000;

dbConnect();

app.use(express.json());
app.use('/api/comercios', comercioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});