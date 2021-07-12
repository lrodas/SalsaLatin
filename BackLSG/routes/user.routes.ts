import { Router, Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';
import Token from "../models/token.model";
import { tokenVerify } from "../middlewares/authentication";
import { transporter } from '../config/mailer';

const userRoutes = Router();

userRoutes.post('/update', tokenVerify,  (req: any, resp: Response) => {
    const user = {
        name: req.body.name || req.user.name,
        username: req.body.username || req.user.username,
        avatar: req.body.avatar || req.user.avatar
    };

    User.findByIdAndUpdate( req.user._id, user, { new: true }, (error, userDB) => {
        
        if (error) throw error;

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

userRoutes.post('/create',  (req: Request, resp: Response) => {
    const user = {
        name: req.body.name,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };

    User.create( user ).then(userDB => {
        resp.json({
            ok: true,
            message: 'todo funciona',
            user: userDB
        });
    }).catch( error => {
        resp.status(500).json({
            ok: false,
            error
        });
    });


});

userRoutes.post('/login', (req: Request, resp: Response) => {
    
    const body = req.body;

    User.findOne({ username: body.username }, (error: any, userDB: any) => {
        if (error) throw error;

        if (!userDB) {
            return resp.json({
                ok: false,
                message: 'Usuario o contraseña no son correctos'
            });
        }
        
        if (userDB.comparePass(body.password)) {

            const tokenUser = Token.getJwtToken({ 
                _id: userDB._id,
                name: userDB.name,
                username: userDB.username,
                avatar: userDB.avatar
            });

            resp.json({
                ok: true,
                token: tokenUser
            });
        } else {
            resp.json({
                ok: true,
                message: 'Error'
            });
        }

    });
});

userRoutes.get('/', [ tokenVerify ], (req: any, res: Response) => {
    const user = req.user;

    res.json({
        ok: true,
        user
    });
});

userRoutes.post('/sendEmail', async (req: any, res: Response) => {
    const mailTo = req.body.mailTo;
    const mailBody = req.body.mailBody;
    const user = req.body.user;
    const mailFrom = req.body.mailFrom; 

    if (user == 'A4B9DF1D0952727EAEAB1DB7674E1AF3AF28F47489AEA233EF0B4D5DF58B38DC') {

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"Solicitud información:" <${mailFrom}>`, // sender address
            to: mailTo, // list of receivers
            subject: "Solicitud de información desde la pagina web", // Subject line
            text: mailBody, // plain text body
        });

        res.json({
            ok: true,
            message: 'Mensaje envíado correctamente',
            info
        });
    } else {
        res.json({
            ok: false,
            message: 'El usuario enviado no es correcto'
        });
    }
});

export default userRoutes;