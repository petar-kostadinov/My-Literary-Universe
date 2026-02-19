import Book from "../models/Book.js";

export default {
    getAll(filter = {}) {
        let query = Book.find();

        //let result = await Movie.find({});

        if (filter.search) {
            //result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
            query = query.find({ title: { $regex: new RegExp(filter.search, 'i') } });
        }

        if (filter.genre) {
            //result = result.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());
            query = query.find({ genre: filter.genre.toLowerCase() });
        }

        if (filter.year) {
            //result = result.filter(movie => movie.year === filter.year);
            query = query.find({ year: filter.year });
        }

        return query;
    },
    create(bookData, userId) {
        const book = new Book(bookData);

        book.owner = userId;

        return book.save();
    },
    async getOne(bookId) {
        const book = await Book.findById(bookId).populate('casts');

        return book;
    },

    async attach(bookId, castId) {
        const book = await this.getOne(bookId);

        book.casts.push(castId);

        return book.save();
    },
    delete(bookId) {
        return Book.findByIdAndDelete(bookId);
    },
    update(bookId, bookData) {
        return Book.findByIdAndUpdate(bookId, bookData);
    },
}