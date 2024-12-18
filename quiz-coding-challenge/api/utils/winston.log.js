import winston from 'winston';
const { combine, colorize, timestamp, splat, printf } = winston.format;
import { v4 as uuid } from 'uuid';

const customLevels = {
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0,
    },
    colors: {
        trace: 'white',
        debug: 'green',
        info: 'green',
        warn: 'yellow',
        error: 'red',
        fatal: 'red',
    },
};

const formatter = combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS A' }),
    splat(),
    printf((info) => {
        const { timestamp, level, message, ...meta } = info;

        return `<code data-enlighter-language="raw" class="EnlighterJSRAW">${uuid()}---${timestamp}----[${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
            }</code>`;
    }),
);

class Logger {
    logger;
    constructor() {
        const prodTransport = [
            new winston.transports.File({
                filename: 'logs/error.log',
                level: 'error',
            })
        ];
        const transport = [
            new winston.transports.Console({
                format: formatter,
            }),
            new winston.transports.File({
                filename: 'logs/error.log',
                level: 'error',
            })
        ]
        this.logger = winston.createLogger({
            level: this.isDevEnvironment() ? 'trace' : 'error',
            levels: customLevels.levels,
            transports: this.isDevEnvironment() ? transport : prodTransport,
        });
        winston.addColors(customLevels.colors);
    }

    isDevEnvironment() {
        return process.env.NODE_ENV === 'DEVELOP';
    }

    trace(msg, meta) {
        this.logger.log('trace', msg, meta);
    }

    debug(msg, meta) {
        this.logger.debug(msg, meta);
    }

    info(msg, meta) {
        this.logger.info(msg, meta);
    }

    warn(msg, meta) {
        this.logger.warn(msg, meta);
    }

    error(msg, meta) {
        this.logger.error(msg, meta);
    }

    fatal(msg, meta) {
        this.logger.log('fatal', msg, meta);
    }
}
const logger = new Logger();

export default logger;
