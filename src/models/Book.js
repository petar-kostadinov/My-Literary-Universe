import { Schema, model, Types } from "mongoose";
import { validate } from "uuid";

const maxYearAllowed = new Date().getFullYear() + 5;
const validCharactersPattern = /^[a-zA-Z0-9 ]+$/;

const bookShema = new Schema({
    title: {
        type: String,
        required: [true, 'This field is required'],
        validate: [validCharactersPattern, 'Only english letters,digits and whitespace are allowed!'],
        minLength: [5, 'Title should be at least 5 characters long'],
    },
    category: {
        type: String,
        required: [true, 'This field is required'],
        enum: {
            values: ['tv-show', 'animation', 'Book', 'documentary', 'short-film'],
            message: (props) => `${props.value} is not a valid category!`
        }
    },
    genre: {
        type: String,
        required: [true, 'This field is required'],
        lowercase: true,
        minLength: [5, 'Genre should be at least 5 characters long'],
        validate: [validCharactersPattern, 'Only english letters,digits and whitespace are allowed!'],
    },
    director: {
        type: String,
        required: [true, 'This field is required'],
        minLength: [5, 'Director should be at least 5 characters long'],
        validate: [validCharactersPattern, 'Only english letters,digits and whitespace are allowed!'],
    },
    year: {
        type: Number,
        required: [true, 'This field is required'],
        min: [1900, 'Book year cannot be less than 1900 year'],
        max: [maxYearAllowed, `Year cannot be larger than ${maxYearAllowed}`],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image Url i required'],
        validate: [/^https?:\/\//, 'Invalid image Url'],
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
    description: {
        type: String,
        required: [true, 'Rating is required'],
        maxLength: [1500, 'Description is too long!'],
        minLength: [20, 'Descriptiion is too short!'],
        validate: [validCharactersPattern, 'Only english letters,digits and whitespace are allowed!'],
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast',
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

const Book = model('Book', bookShema);

export default Book;

