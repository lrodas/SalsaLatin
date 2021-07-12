"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const express = require('express');
const server = new server_1.default();
// body parser
server.app.use(express.json());
server.app.use(express.urlencoded({ extended: true }));
// File upload
server.app.use(express_fileupload_1.default());
// Configurar Cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
// rutas de la app
server.app.use('/user', user_routes_1.default);
server.app.use('/posts', post_routes_1.default);
// conexion a base de datos;
mongoose_1.default.connect('mongodb://localhost4:27017/salsalatin', {
    useNewUrlParser: true,
    useCreateIndex: true
}, err => {
    if (err)
        throw err;
    console.log('Base de datos online');
});
// Levanta el server
server.start(() => {
    console.log(`Servidor corriendo en puerto: ${server.port}`);
});
