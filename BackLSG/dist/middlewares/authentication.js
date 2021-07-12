"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_model_1 = __importDefault(require("../models/token.model"));
exports.tokenVerify = (req, res, next) => {
    const userToken = req.get('Authorization') || '';
    token_model_1.default.compareToken(userToken.substring(7))
        .then((decoded) => {
        req.user = decoded.user;
        next();
    })
        .catch(error => {
        res.json({
            ok: false,
            message: 'Token no es correcto'
        });
    });
};
