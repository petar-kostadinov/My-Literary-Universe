import { Schema, model, Types } from "mongoose";
import { validate } from "uuid";

const maxYearAllowed = new Date().getFullYear() + 5;
const validCharactersPattern = /^[^<>]+$/;
const validAuthorCharacters = /^[A-Za-zА-Яа-я\s.\-']+$/;

const bookShema = new Schema({
    title: {
        type: String,
        required: [true, 'Полето е задължително'],
        unique: true,
        validate: [validCharactersPattern, 'Позволени са само букви, цифри и интервали!'],
        minLength: [5, 'Дължината трябва да е минимум 5 символа'],
    },
    author: {
        type: String,
        required: [true, 'Полето е задължително'],
        minLength: [5, 'Дължината трябва да е минимум 5 символа'],
        validate: [validAuthorCharacters, 'Позволени са само букви, цифри и интервали!'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Полето е задължително'],
        validate: [/^https?:\/\//, 'Невалиден URL адрес на изображението'],
    },
    description: {
        type: String,
        required: [true, 'Полето е задължително'],
        maxLength: [1500, 'Описанието е твърде дълго!'],
        minLength: [20, 'Описанието е недостатъчно!'],
        validate: [validCharactersPattern, 'Позволени са само букви, цифри и интервали!'],
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

const Book = model('Book', bookShema);

export default Book;

