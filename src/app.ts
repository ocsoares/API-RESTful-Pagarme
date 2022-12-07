import 'dotenv/config';
import 'express-async-errors';
import express, { Request, Response } from 'express';
import cors from 'cors';
import morganMiddleware from './middleware/validation/morganMiddleware';
import { errorAPIMiddleware, pageNotFound } from './middleware/errorAPIMiddleware';
import authRoute from './routes/authRoute';
import transactionRoute from './routes/transactionRoute';
import swaggerUi from 'swagger-ui-express';
import { swaggerJSON } from './docs/swagger';

// OBS: Tive que separar assim por causa dos Testes !!

const app = express();

app.use(express.json());

app.use(cors());

app.use(morganMiddleware);

app.get('/', (req: Request, res: Response): void => {
    return res.redirect('/api/docs');
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON));

app.use('/api/',
    authRoute,
    transactionRoute
);

app.use(pageNotFound);

app.use(errorAPIMiddleware);

export { app };