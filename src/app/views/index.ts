import http from "http";
import express from "express";
import carsRouter from "../../routes/cars.routes"
import usersRouter from "../../routes/users.routes"
import adminsRouter from "../../routes/admins.routes"
const loopback = require("loopback");
const db = require('../../db/db');

db();

const port = 3000;


const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use("/cars", carsRouter);
app.use("/users", usersRouter);
app.use("/admin", adminsRouter)




const server = http.createServer(app);
server.listen(port, () => {
    console.log(`APIServer listening on port ${port}`);
})