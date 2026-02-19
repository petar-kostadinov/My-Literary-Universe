import bcrypt from 'bcrypt'

import User from "../models/User.js"
import { generateAuthToken } from '../utils/authUtils.js';

export default {
    async register(userData) {

        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('User already exist');
            
        };
        
        const user = await User.create(userData);

        const token = generateAuthToken(user);

        return token;
    },
    async login(email, password) {

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('No such user');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invalid password');
        }

        const token = generateAuthToken(user);

        return token;
    },
};
