import { Request, Response, NextFunction } from 'express';
import Token from '../models/token.model';

export const tokenVerify = (req: any, res: Response, next: NextFunction) => {

    const userToken = req.get('Authorization') || '';

    Token.compareToken(userToken.substring(7))
        .then((decoded: any) => {
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