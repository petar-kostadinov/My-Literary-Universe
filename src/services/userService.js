import bcrypt from 'bcrypt'

import User from "../models/User.js"
import { generateAuthToken } from '../utils/authUtils.js';

export default {
    async register(userData) {

        const existingUser = await User.findOne({ username: userData.username });
        if (existingUser) {
            throw new Error('User already exist');
            
        };
        
        const user = await User.create(userData);

        const token = generateAuthToken(user);

        return token;
    },
    async login(username, password) {

        const user = await User.findOne({ username });

        if (!user) {
            throw new Error('Няма такъв потребител');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Невалидна парола');
        }

        const token = generateAuthToken(user);

        return token;
    },
};
