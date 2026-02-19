import express from 'express'
import castService from '../services/castService.js';
import { isAuth } from '../middleware/authMiddleware.js';

const castController = express.Router();

castController.get('/create', isAuth, (req, res) => {
    res.render('cast/create', { pageTitle: 'Create cast' });
});

castController.post('/create', isAuth, async (req, res) => {
    const castData = req.body;

    await castService.create(castData);

    res.redirect('/');
})

export default castController;