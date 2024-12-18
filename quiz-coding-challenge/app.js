import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import router from './router.js';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

// settings
app.set('port', process.env.PORT || 3000);

// middleware
app.use(session({
    secret: 'sessionSecretKey',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
// Decrease payload size
app.use(compression());
// Use to get query string or params from request payload
app.use(bodyParser.json());
app.use(cors());
// Prevent user inspect API is built from express.
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
router(app);

export default app;