import Server from "./clases/server";
import userRoutes from "./routes/user.routes";
import mongoose from 'mongoose';
import postRoutes from "./routes/post.routes";
import fileUpload from 'express-fileupload';
import cors from 'cors';

const express = require('express');
const server = new Server();

// body parser
server.app.use(express.json())
server.app.use(express.urlencoded({ extended: true }));

// File upload
server.app.use(fileUpload());

// Configurar Cors
server.app.use(cors({ origin: true, credentials: true }));

// rutas de la app
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

// conexion a base de datos;

mongoose.connect('mongodb://192.168.3.84:27017/salsalatin', {
    useNewUrlParser: true,
    useCreateIndex: true
}, err =>{
    if (err) throw err;
    console.log('Base de datos online');
});

// Levanta el server
server.start(() => {
    console.log(`Servidor corriendo en puerto: ${server.port}`)
});