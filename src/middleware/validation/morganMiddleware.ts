import 'dotenv/config';
import morgan, { StreamOptions } from 'morgan';
import Logger from '../../config/logs';

const stream: StreamOptions = {
    write: (message) => Logger.http(message)
};

const skipMorgan = () => {
    return process.env.NODE_ENV ? true : false;
};

const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream, skip: skipMorgan }
);

export default morganMiddleware;