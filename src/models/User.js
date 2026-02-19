import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        //minLength: 10,
        //validate: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, 'Invalid Email Format']
    },
    password: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9]+$/, 'Password should be alphanumeric'],
        minLength: [6, 'Password should be at least 6 characters long!'],
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