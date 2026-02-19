import jsonwebtoken from 'jsonwebtoken';
import { jwSecret } from '../config/index.js';

export const auth = (req, res, next) => {

    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const { id, email } = jsonwebtoken.verify(token, jwSecret);

        req.user = { id, email };
        res.locals.user = { id, email };

        next();
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/users/login');
    }
};

export const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/users/login');
    }

    next();
};