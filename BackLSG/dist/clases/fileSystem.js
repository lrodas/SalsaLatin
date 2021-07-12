"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    saveTemImage(file, userId) {
        return new Promise((resolve, reject) => {
            // Craemos las carpetas
            const path = this.createFolderUser(userId);
            // Creamos el nombre del archivo
            const fileName = this.generateName(file.name);
            // Creamos el nuevo archivo de imagen
            file.mv(`${path}/${fileName}`, (err) => {
                if (err) {
                    // No se pudo crear
                    reject(err);
                }
                else {
                    // Todo salio bien
                    resolve('Archivo creado exitosamente');
                }
            });
        });
    }
    persistImages(userId) {
        const pathUserTemp = path_1.default.resolve(__dirname, '../uploads', userId, 'temp');
        const pathUserPosts = path_1.default.resolve(__dirname, '../uploads', userId, 'posts');
        if (!fs_1.default.existsSync(pathUserTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathUserPosts)) {
            fs_1.default.mkdirSync(pathUserPosts);
        }
        const imagesTemp = this.getTempImages(userId);
        imagesTemp.forEach(image => {
            fs_1.default.renameSync(`${pathUserTemp}/${image}`, `${pathUserPosts}/${image}`);
        });
        return imagesTemp;
    }
    getImageUrl(userId, img) {
        const url = path_1.default.resolve(__dirname, '../uploads', userId, 'posts', img);
        const exists = fs_1.default.existsSync(url);
        console.log(exists);
        if (!exists) {
            return path_1.default.resolve(__dirname, '../assets/400x250.jpg');
        }
        return url;
    }
    getTempImages(userId) {
        const pathUserTemp = path_1.default.resolve(__dirname, '../uploads', userId, 'temp');
        return fs_1.default.readdirSync(pathUserTemp) || [];
    }
    generateName(originalName) {
        const nameArr = originalName.split('.');
        const ext = nameArr[nameArr.length - 1];
        const uniqName = uniqid_1.default();
        return `${uniqName}.${ext}`;
    }
    createFolderUser(userId) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads', userId);
        const pathUserTemp = pathUser + '/temp';
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
}
exports.default = FileSystem;
