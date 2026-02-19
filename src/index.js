import express from 'express'
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';


import cookieParser from 'cookie-parser';
import { auth } from './middleware/authMiddleware.js';
import routes from './routes.js';

const app = express();

app.use(express.static('./src/public'));

app.use(cookieParser());

app.use(express.urlencoded());

app.use(auth);

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        showRating(rating) {
            return '★'.repeat(Math.floor(rating));
        },
        setTitle(title) {
            this.pageTitle = title;
        }
    },
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
}));

try {
    await mongoose.connect('mongodb://localhost:27017/', { dbName: 'my-literary-universe' });
    console.log('Successfully conect to DB');
    
} catch (err) {
    console.log('Cannot connect to DB');
    console.log(err.message);
    
    
}

app.set('view engine', 'hbs');

app.set('views', './src/views');

app.use(routes);

app.listen(5000, () => console.log('Server is listening on http://localhost:5000....'));