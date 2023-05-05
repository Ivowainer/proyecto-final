// Importar dependencias necesarias
import express from 'express';
import router from './routes/router';

// Crear instancia de Express
const app = express();

// Configuración de middleware
app.use(express.json());

// Rutas
app.use(router);

// Inicializar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
