const winston = require("winston");
const expressWinston = require("express-winston");

// Logger para solicitudes
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "logs/request.log" })],
  format: winston.format.json(),
});

// Logger para errores
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "logs/error.log" })],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
