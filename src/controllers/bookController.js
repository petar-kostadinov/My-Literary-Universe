import express from 'express'
import bookService from '../services/bookService.js';
//import castService from '../services/castService.js';
import { getCategoryOptionsViewData } from '../utils/movieUtils.js';
import { isAuth } from '../middleware/authMiddleware.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const bookcontroller = express.Router();

bookcontroller.get('/create', isAuth, (req, res) => {

    const categoryOptionsViewData = getCategoryOptionsViewData("");

    res.render('book/create', {
        categoryOptions: categoryOptionsViewData,
    });
});

bookcontroller.post('/create', isAuth, async (req, res) => {
    const userId = req.user.id;

    const newBook = req.body;
    try {
        await bookService.create(newBook, userId);

        res.redirect('/');

    } catch (err) {

        const categoryOptionsViewData = getCategoryOptionsViewData(newBook.category);

        res.render('book/create', {
            pageTitle: 'Create',
            error: getErrorMessage(err),
            book: newBook,
            categoryOptions: categoryOptionsViewData,
        });
    }

});

bookcontroller.get('/:bookId/details', async (req, res) => {
    const bookId = req.params.bookId;

    const userId = req.user?.id;

    const book = await bookService.getOne(bookId);

    const isOwner = book.owner?.equals(userId);

    res.render('book/details', { book, isOwner, pageTitle: 'Details' });
});

bookcontroller.get('/search', async (req, res) => {

    const filter = req.query;

    console.log(filter);
    

    const books = await bookService.getAll(filter);

    res.render('search', { books, filter, pageTitle: 'Search' });
})

/*bookcontroller.get('/:bookId/attach', isAuth, async (req, res) => {
    const bookId = req.params.bookId;

    const book = await bookService.getOne(bookId);

    const casts = await castService.getAll({ exclude: book.casts });

    res.render('book/attach', { book, casts, pageTitle: 'Attach' });
});

bookcontroller.post('/:bookId/attach', isAuth, async (req, res) => {

    const bookId = req.params.bookId;


    const castId = req.body.cast;

    await bookService.attach(bookId, castId);

    res.redirect(`/books/${bookId}/details`);

});*/

bookcontroller.get('/:bookId/delete', isAuth, async (req, res) => {

    const bookId = req.params.bookId;

    await bookService.delete(bookId);

    res.redirect('/');

});

bookcontroller.get('/:bookId/edit', isAuth, async (req, res) => {

    const bookId = req.params.bookId;

    const userId = req.user?.id;

    const book = await bookService.getOne(bookId);

    const isOwner = book.owner?.equals(userId);

    if (!isOwner) {
        return res.render('404', { error: 'You do not have rights to this resource!' });
    }

    const categoryOptionsViewData = getCategoryOptionsViewData(book.category);

    res.render('book/edit', {
        book,
        categoryOptions: categoryOptionsViewData,
        pageTitle: 'Edit'
    });
});

bookcontroller.post('/:bookId/edit', isAuth, async (req, res) => {

    const bookId = req.params.bookId;

    const bookData = req.body;

    //const userId = req.user?.id;

    await bookService.update(bookId, bookData);

    res.redirect(`/books/${bookId}/details`);
});

export default bookcontroller;