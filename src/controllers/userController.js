import { Router } from "express";
import userService from "../services/userService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const userController = Router();

userController.get('/register', (req, res) => {
    res.render('user/register', { pageTitle: 'Register' });
});

userController.post('/register', async (req, res) => {
    const { email, password, repass } = req.body;

    try {
        const token = await userService.register({ email, password, repass });

        res.cookie('auth', token);

        res.redirect('/');

    } catch (err) {
        res.render('user/register', {
            pageTitle: 'Register',
            error: getErrorMessage(err),
            email
        });
    }



});

userController.get('/login', (req, res) => {
    res.render('user/login', { pageTitle: 'Login' });
});

userController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.login(email, password);

        res.cookie('auth', token);
        res.redirect('/');

    } catch (err) {

        res.render('user/login', {
            pageTitle: 'Login',
            error: getErrorMessage(err),
            email,
        });
    }
});

userController.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
})

export default userController;