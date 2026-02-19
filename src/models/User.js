import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Полето е задължително'],
        unique: true,
        minLength: [4, 'Дължината трябва да е поне 6 символа'],
        //validate: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, 'Invalid Email Format']
    },
    password: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9]+$/, 'Паролата трябва да съдържа букви или цифри'],
        minLength: [6, 'Паролата трябва да е минимум 6 символа'],
    }
});

userSchema.pre('save', async function () {
    //const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.virtual('repass')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('Password no match');
        }
    });

const User = model('User', userSchema);

export default User;