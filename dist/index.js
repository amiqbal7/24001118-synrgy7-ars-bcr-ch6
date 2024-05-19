"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cars_routes_1 = __importDefault(require("./routes/cars.routes"));
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/cars", cars_routes_1.default);
app.get('/hello-world', (req, res) => {
    res.status(200).json({
        message: "Hello world!"
    });
});
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`APIServer listening on port ${port}`);
});
//# sourceMappingURL=index.js.map