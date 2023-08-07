import { Request, Response, NextFunction } from 'express';
import { HTTP_UNAUTHORIZED } from '../constants/http_status';
import { verify } from 'jsonwebtoken';

export default (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.access_token as string;

    if(!token) return res.status(HTTP_UNAUTHORIZED).send();

    try {
            const decodedUser = verify(token, 'sometext'!)
            req.user = decodedUser
    } catch(err) {
        res.status(HTTP_UNAUTHORIZED).send()
    }

    return next();
}