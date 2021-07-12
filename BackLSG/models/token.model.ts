import jwt from 'jsonwebtoken';

export default class Token {
    private static seed: string = 'salsa-latin-guatemala-backend-123456789'
    private static expiration: string = '1d';

    constructor() {}

    public static getJwtToken( payload: any ): string {
        return jwt.sign({ 
            user: payload
         }, this.seed, { expiresIn: this.expiration });
    }

    public static compareToken(userToken: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (error, decoded) => {
                if (error) {
                    reject();
                } else {
                    resolve(decoded);
                }
            });
        });
    }
}