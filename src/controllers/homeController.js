import express from 'express';
import bookService from '../services/bookService.js';

const homecontroller = express.Router();

homecontroller.get('/', async (req, res) => {
    const books = await bookService.getAll();
       
              
    res.render('home', { books });
});

homecontroller.get('/about', (req, res) => {
    res.render('about');
});

export default homecontroller;