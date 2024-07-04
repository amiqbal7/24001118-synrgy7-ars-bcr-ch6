import http from "http";
import express from "express";
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
import carsRouter from "../../routes/cars.routes";
import usersRouter from "../../routes/users.routes";
import carsServices from "../services/carsServices";
const db = require('../../db/db');
const cors = require("cors");
const cron = require("node-cron")

db();

const port = 3000;
cron.schedule('0 0 * * *', () => {
    carsServices.updateExpiredRentDates();
  });
const swaggerDocuments = YAML.load('././openapi.yaml');

const app = express();

app.use(cors()); 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocuments));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

app.use("/cars", carsRouter);
app.use("/users", usersRouter);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`API Server listening on port ${port}`);
});
