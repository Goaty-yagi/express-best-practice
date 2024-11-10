import winston from 'winston';
import fs from 'fs';
import config from '../config';
import path from 'path';


const productionTransport = () => {
  // Example
  const logDir = config.logs.dir || 'logs';
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true }); // Create directory if it doesn't exist
  }

  // Define log file path
  const logFilePath = path.join(logDir, 'app.log');
  return new winston.transports.File({
    filename: logFilePath,
    level: 'info', // Default level for file logging
  })
}

const transports = [];
if(config.env !== 'development') {
  transports.push(
    productionTransport()
  )
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      )
    })
  )
}

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports
});

export default LoggerInstance;