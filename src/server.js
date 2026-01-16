require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;
(async () =>{
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos');
    
    app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    });

  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
  }
})();




