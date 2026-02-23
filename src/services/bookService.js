import Book from "../models/Book.js";

export default {
    getAll(filter = {}) {
        let query = Book.find();


        if (filter.search) {
            query = query.find({ title: { $regex: new RegExp(filter.search, 'i') } });
        }

        if (filter.author) {
            query = query.find({ author: { $regex: new RegExp(filter.author, 'i') } });
        }


        return query;
    },
    async create(bookData, userId) {

        const existingBook = await Book.findOne({
            title: new RegExp(`^${bookData.title}$`, 'i'),
            author: new RegExp(`^${bookData.author}$`, 'i')
        });
        if (existingBook) {
            throw new Error('Книгата вече съществува');

        };

        const book = new Book(bookData);

        book.owner = userId;

        return book.save();
    },
    async getOne(bookId) {
        const book = await Book.findById(bookId);

        return book;
    },
    delete(bookId) {
        return Book.findByIdAndDelete(bookId);
    },
    update(bookId, bookData) {
        return Book.findByIdAndUpdate(bookId, bookData);
    },
}