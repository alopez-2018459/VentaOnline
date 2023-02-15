 //Servidor Express
const express = require('express');
//  Seguridad Basica del servidor
const helmet = require('helmet');
//  Aceptación de solicitudes desde otro origen o desde la misma maquina
const cors = require('cors');
// Logs para solicitudes basicas del servidor
const morgan = require('morgan');

//Routes

const categoryRoutes = require('../src/category/category.routes');
const userRoutes = require('../src/User/user.routes');


//Config Server Express

//  Instancia de Express
const app = express();
const port = process.env.PORT || 3200;

//Setup Inicial Server Express

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


//Rutas De coleccion

app.use('/category', categoryRoutes);
app.use('/user', userRoutes);

//Función para levantar el servidor

exports.initServer = () => {
    app.listen(port);
    console.log(`Server HTTP is running on port ${port}`);
} 