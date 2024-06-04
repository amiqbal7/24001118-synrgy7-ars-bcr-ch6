import http from "http";
import express from "express";
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
import carsRouter from "../../routes/cars.routes"
import usersRouter from "../../routes/users.routes"
const db = require('../../db/db');

db();
const port = 3000;
const swaggerDocuments= YAML.load('././openapi.yaml');




const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocuments));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use("/cars", carsRouter);
app.use("/users", usersRouter);


const server = http.createServer(app);
server.listen(port, () => {
    console.log(`APIServer listening on port ${port}`);
})