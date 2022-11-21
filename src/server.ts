import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import atlasDBConnection from './config/database';
import Logger from './config/logs';
import morganMiddleware from './middleware/validation/morganMiddleware';
import { errorAPIMiddleware, pageNotFound } from './middleware/errorAPIMiddleware';
import authRoute from './routes/authRoute';

const server = express();

const host = process.env.HOST_URL;
const port = process.env.HOST_PORT;

server.use(express.json());

server.use(cors());

server.use(morganMiddleware);

server.use('/api/',
    authRoute
);

server.use(pageNotFound);

server.use(errorAPIMiddleware);

server.listen(port, async () => {
    await atlasDBConnection();

    Logger.info(`Servidor rodando remotamente em ${host}:${port}`);
});