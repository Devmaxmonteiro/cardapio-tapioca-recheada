import winston from 'winston';

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(metadata).length > 0) {
        msg += ` ${JSON.stringify(metadata)}`;
    }
    return msg;
});

export function createLogger(service) {
    return createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: combine(
            timestamp(),
            logFormat
        ),
        defaultMeta: { service },
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'logs/error.log', level: 'error' }),
            new transports.File({ filename: 'logs/combined.log' })
        ]
    });
} 