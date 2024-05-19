import http from "http";
import express from "express";
import carsRouter from "./routes/cars.routes"
import bodyParser from "body-parser";
const db = require('./db/db');

db();

const port = 3000;


const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/cars", carsRouter);




const server = http.createServer(app);
server.listen(port, () => {
    console.log(`APIServer listening on port ${port}`);
})