"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileSystem_1 = __importDefault(require("../clases/fileSystem"));
const authentication_1 = require("../middlewares/authentication");
const post_model_1 = require("../models/post.model");
const postRoutes = express_1.Router();
const fileSystem = new fileSystem_1.default();
// Obtener los post paginados
postRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    let skip = page - 1;
    skip = skip * 10;
    const posts = yield post_model_1.Post.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('user', '-password')
        .exec();
    res.json({
        ok: true,
        page,
        posts
    });
}));
postRoutes.post('/', [authentication_1.tokenVerify], (req, res) => {
    const body = req.body;
    body.user = req.user._id;
    const images = fileSystem.persistImages(req.user._id);
    body.imgs = images;
    post_model_1.Post.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('user', '-password').executePopulate();
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
//Servicio para subir archivos
postRoutes.post('/upload', [authentication_1.tokenVerify], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        res.status(400).json({
            ok: false,
            message: 'No se subio ningun archivo'
        });
    }
    const files = req.files.image;
    if (!files) {
        res.status(400).json({
            ok: false,
            message: 'No se subio ningun archivo'
        });
    }
    files.forEach(file => {
        if (!file.mimetype.includes('image')) {
            res.status(400).json({
                ok: false,
                message: 'Uno de los archivos adjunto no es una imagen'
            });
        }
    });
    yield files.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
        yield fileSystem.saveTemImage(file, req.user._id);
    }));
    res.json({
        ok: true,
        file: files[0].mimetype
    });
}));
postRoutes.get('/image/:userId/:img', (req, res) => {
    const userId = req.params.userId;
    const img = req.params.img;
    const pathImg = fileSystem.getImageUrl(userId, img);
    res.sendFile(pathImg);
});
exports.default = postRoutes;
