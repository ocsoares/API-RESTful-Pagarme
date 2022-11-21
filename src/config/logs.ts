import winston, { format, transports } from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

const checkEnvironment = () => {
    if (process.env.NODE_ENV === 'production') {
        return 'warn';
    }
    else {
        return 'debug';
    }
};

const colorsLog = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};

winston.addColors(colorsLog);

const formatLog = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize({ all: true }),
    format.printf(
        (info) => `${info.timestamp} - ${info.level}: ${info.message}`
    )
);

const transportsLog = [
    new transports.Console(),

    new transports.File({
        filename: 'logs/error.log',
        level: 'error'
    }),

    new transports.File({
        filename: 'logs/warn.log',
        level: 'warn'
    }),

    new transports.File({
        filename: 'logs/info.log',
        level: 'info'
    }),

    new transports.File({
        filename: 'logs/http.log',
        level: 'http',
    }),

    new transports.File({
        filename: 'logs/debug.log',
        level: 'debug'
    }),

    new transports.File({
        filename: 'logs/all-logs.log'
    })
];

const Logger = winston.createLogger({
    level: checkEnvironment(),
    levels,
    format: formatLog,
    transports: transportsLog
});

export default Logger;