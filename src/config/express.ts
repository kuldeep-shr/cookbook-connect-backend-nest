import express from "express";
import morgan from "morgan";
import * as bodyParser from "body-parser";
import application from "../constants/application";
import indexRoute from "../routes/index.route";
import * as errorHandler from "../middlewares/apiErrorHandler";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// REST Routes
app.use(application.url.base, indexRoute);

// Error Handlers
app.use(errorHandler.notFoundErrorHandler);
app.use(errorHandler.errorHandler);

export default app;
