import winston from "winston";


const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  };
  
  
  // logger de desarrollo
  export const loggerDev = winston.createLogger({
    level: "debug",
    levels: logLevels,
    transports: [new winston.transports.Console()]
  });
  
  // logger de producción
  export const loggerProduction = winston.createLogger({
    level: "info",
    levels: logLevels,
    transports: [new winston.transports.File({ filename: "./error.log" }),
    new winston.transports.Console()]
  })