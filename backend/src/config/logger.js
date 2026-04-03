import { createLogger, transports, format } from "winston";
import config from "./config.js";
import path from "path";
import fs from "fs";
import DailyRotateFile from "winston-daily-rotate-file";

let dirs = config.LOG_DIR ?? "logs"


if (!dirs) dirs = path.resolve('logs')

if (!fs.existsSync(dirs)) {
    fs.mkdirSync(dirs, { recursive: true })
}

const loglevel = config.NODE_ENV == "development" ? "debug" : "warn"

const dailyrotefile = new DailyRotateFile({
    level: loglevel,
    filename: `${dirs}/%DATE%-results.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    handleExceptions: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: format.combine(
        format.errors({ stack: true }),
        format.timestamp(),
        format.json(),
    )
})


export default createLogger({
    transports: [
        new transports.Console({
            level: loglevel,
            format: format.combine(
                format.errors({ stak: true }),
                format.colorize(),
                format.prettyPrint()
            ),
        }),
        dailyrotefile
    ],
    exceptionHandlers: [dailyrotefile],
    exitOnError: false,
    
})