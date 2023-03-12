import * as jwt from 'jsonwebtoken';
import express from 'express';
export class TokenValidatorMiddlehare{
    static tokenvalidate = (req: express.Request, res: express.Response, next: express.NextFunction ) => {
        try {
            let token = req.headers.authorization.split(' ')[1];
            let decoded = jwt.verify(token,'superSecret@wwe');
            req.body.token = req.headers.authorization.split(' ')[1];
            next();
        } catch (error) {
            return res.status(401).json({ message: 'auth faild' });
        }
    }
}