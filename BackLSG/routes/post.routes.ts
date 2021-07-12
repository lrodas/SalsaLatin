import { Router, Response } from "express";
import FileSystem from "../clases/fileSystem";
import { FileUpload } from "../interfaces/files-upload";
import { tokenVerify } from "../middlewares/authentication";
import { Post } from "../models/post.model";

const postRoutes = Router();
const fileSystem = new FileSystem();

// Obtener los post paginados
postRoutes.get('/', async (req: any, res: Response) =>{

    const page = Number(req.query.page) || 1;
    let skip = page - 1;
    skip = skip * 10;

    const posts = await Post.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('user', '-password')
        .exec();

    res.json({
        ok:true,
        page,
        posts
    });
});

postRoutes.post('/', [tokenVerify], (req: any, res: Response) => {

    const body = req.body;
    body.user = req.user._id;

    const images: string[] = fileSystem.persistImages(req.user._id);

    body.imgs = images;

    Post.create(body).then( async postDB => {

        await postDB.populate('user', '-password').executePopulate();

        res.json({
            ok: true,
            post: postDB
        });
    }).catch(err => {
        res.json(err);
    });

});


//Servicio para subir archivos
postRoutes.post('/upload', [tokenVerify], async (req: any, res: Response) => {
    if (!req.files) {
        res.status(400).json({
            ok: false,
            message: 'No se subio ningun archivo'
        });
    }

    const files: FileUpload[] = req.files.image

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

    await files.forEach(async file => {
        await fileSystem.saveTemImage(file, req.user._id);
    });

    res.json({
        ok: true,
        file: files[0].mimetype
    });
});

postRoutes.get('/image/:userId/:img', (req: any, res: Response) => {
    const userId = req.params.userId;
    const img = req.params.img;

    const pathImg = fileSystem.getImageUrl(userId, img);

    res.sendFile(pathImg);
});

export default postRoutes;