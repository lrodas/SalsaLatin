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
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_model_1 = __importDefault(require("../models/token.model"));
const authentication_1 = require("../middlewares/authentication");
const mailer_1 = require("../config/mailer");
const userRoutes = express_1.Router();
userRoutes.post('/update', authentication_1.tokenVerify, (req, resp) => {
    const user = {
        name: req.body.name || req.user.name,
        username: req.body.username || req.user.username,
        avatar: req.body.avatar || req.user.avatar
    };
    user_model_1.User.findByIdAndUpdate(req.user._id, user, { new: true }, (error, userDB) => {
        if (error)
            throw error;
        if (!userDB) {
            resp.status(500).json({
                ok: false,
                message: 'Usuario no existe'
            });
        }
        resp.json({
            ok: true,
            message: 'Usuario actualizado con exito',
            user: userDB
        });
    });
});
userRoutes.post('/create', (req, resp) => {
    const user = {
        name: req.body.name,
        username: req.body.username,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    user_model_1.User.create(user).then(userDB => {
        resp.json({
            ok: true,
            message: 'todo funciona',
            user: userDB
        });
    }).catch(error => {
        resp.status(500).json({
            ok: false,
            error
        });
    });
});
userRoutes.post('/login', (req, resp) => {
    const body = req.body;
    user_model_1.User.findOne({ username: body.username }, (error, userDB) => {
        if (error)
            throw error;
        if (!userDB) {
            return resp.json({
                ok: false,
                message: 'Usuario o contraseña no son correctos'
            });
        }
        if (userDB.comparePass(body.password)) {
            const tokenUser = token_model_1.default.getJwtToken({
                _id: userDB._id,
                name: userDB.name,
                username: userDB.username,
                avatar: userDB.avatar
            });
            resp.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            resp.json({
                ok: true,
                message: 'Error'
            });
        }
    });
});
userRoutes.get('/', [authentication_1.tokenVerify], (req, res) => {
    const user = req.user;
    res.json({
        ok: true,
        user
    });
});
userRoutes.post('/sendEmail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mailTo = req.body.mailTo;
    const mailBody = req.body.mailBody;
    const user = req.body.user;
    const mailFrom = req.body.mailFrom;
    if (user == 'A4B9DF1D0952727EAEAB1DB7674E1AF3AF28F47489AEA233EF0B4D5DF58B38DC') {
        // send mail with defined transport object
        let info = yield mailer_1.transporter.sendMail({
            from: `"Solicitud información:" <${mailFrom}>`,
            to: mailTo,
            subject: "Solicitud de información desde la pagina web",
            text: mailBody,
        });
        res.json({
            ok: true,
            message: 'Mensaje envíado correctamente',
            info
        });
    }
    else {
        res.json({
            ok: false,
            message: 'El usuario enviado no es correcto'
        });
    }
}));
exports.default = userRoutes;
