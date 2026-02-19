import jsonWebToken from 'jsonwebtoken';
import { jwSecret } from '../config/index.js';

export function generateAuthToken(user) {
    const payLoad = {
        id: user.id,
        email: user.email,
    };

    const token = jsonWebToken.sign(payLoad, jwSecret, { expiresIn: '2h' });

    return token;
};