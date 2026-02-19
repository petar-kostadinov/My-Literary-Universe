import { Schema, model } from "mongoose";

const validCharactersPattern = /^[a-zA-Z0-9 ]+$/;

const castShema = new Schema({
    name: {
        type: String,
        required: true,
        validate: [validCharactersPattern, 'Only english letters,digits and whitespace are allowed!'],
        minLength: [5, 'Name should be at least 5 characters long'],
    },
    age: {
        type: Number,
        required: true,
        min: 12,
        max: 120,
    },
    born: {
        type: String,
        requred: true,
        minLength: [10, 'Born should be at least 10 characters long'],
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?:\/\//,
    }
});

const Cast = model('Cast', castShema);

export default Cast;