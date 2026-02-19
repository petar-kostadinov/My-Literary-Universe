import express from 'express';
import movieService from '../services/movieService.js';

const homecontroller = express.Router();

homecontroller.get('/', async (req, res) => {
    const movies = await movieService.getAll();
       
              
    res.render('home', { movies });
});

homecontroller.get('/about', (req, res) => {
    res.render('about');
});

export default homecontroller;