"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'El nombre de usuario es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
});
userSchema.method('comparePass', function (pass = '') {
    if (bcrypt_1.default.compareSync(pass, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.User = mongoose_1.model('User', userSchema);
