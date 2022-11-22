import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morganMiddleware from './middleware/validation/morganMiddleware';
import { errorAPIMiddleware, pageNotFound } from './middleware/errorAPIMiddleware';
import authRoute from './routes/authRoute';

// OBS: Tive que separar assim por causa dos Testes !!

const app = express();

app.use(express.json());

app.use(cors());

app.use(morganMiddleware);

app.use('/api/',
    authRoute
);

app.use(pageNotFound);

app.use(errorAPIMiddleware);

export { app };