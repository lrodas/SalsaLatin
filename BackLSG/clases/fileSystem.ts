import { FileUpload } from "../interfaces/files-upload";
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {
    constructor() {}

    public saveTemImage(file: FileUpload, userId: string): Promise<string> {

        
        return new Promise ((resolve, reject) => {
            // Craemos las carpetas
            const path = this.createFolderUser(userId);
    
            // Creamos el nombre del archivo
            const fileName = this.generateName(file.name);
    
            // Creamos el nuevo archivo de imagen
            file.mv( `${path}/${fileName}`, (err: any) => {
                if (err) {
                    // No se pudo crear
                    reject(err);
                } else {
                    // Todo salio bien
                    resolve('Archivo creado exitosamente');
                }
            });
        });
    }

    public persistImages(userId: string): string[] {

        const pathUserTemp = path.resolve( __dirname, '../uploads', userId, 'temp' );
        const pathUserPosts = path.resolve( __dirname, '../uploads', userId, 'posts' );

        if (!fs.existsSync(pathUserTemp)) {
            return [];
        }

        if (!fs.existsSync(pathUserPosts)) {
            fs.mkdirSync( pathUserPosts );
        }

        const imagesTemp = this.getTempImages(userId);

        imagesTemp.forEach(image => {
            fs.renameSync(`${pathUserTemp}/${image}`, `${pathUserPosts}/${image}`);
        });

        return imagesTemp;
    }

    public getImageUrl(userId: string, img: string): string {
        const url = path.resolve( __dirname, '../uploads', userId, 'posts', img );

        const exists = fs.existsSync(url);
        console.log(exists);
        if (!exists) {
            return path.resolve( __dirname, '../assets/400x250.jpg');
        }

        return url;
    }

    private getTempImages(userId: string): string[] {
        const pathUserTemp = path.resolve( __dirname, '../uploads', userId, 'temp' );
        return fs.readdirSync(pathUserTemp) || [];
    }

    private generateName( originalName: string ): string {
        const nameArr = originalName.split('.');
        const ext = nameArr[ nameArr.length - 1 ];
        const uniqName = uniqid();

        return `${uniqName}.${ext}`;
    }

    private createFolderUser(userId: string): string {
        const pathUser = path.resolve( __dirname, '../uploads', userId );
        const pathUserTemp = pathUser + '/temp';
        const existe = fs.existsSync(pathUser);
        if (!existe) {
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }

        return pathUserTemp;
    }
}