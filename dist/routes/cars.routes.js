"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cars_1 = require("../__data_mocks__/cars");
const filter_1 = __importDefault(require("../utils/filter"));
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
// GET carlist
router.get('/', (req, res) => {
    res.status(200).json({
        cars: cars_1.cars
    });
});
// get details cars (spesifict)
router.get('/:id', (req, res) => {
    const getId = Number(req.params.id);
    const carById = (0, filter_1.default)(cars_1.cars, getId);
    res.status(200).json({
        car: carById
    });
});
// UPDATE / EDIT
router.put('/:id', (req, res) => {
    const { name, price, startRent, endRent } = req.body;
    const getId = Number(req.params.id);
    const bodyParam = req.body;
    const carById = (0, filter_1.default)(cars_1.cars, getId);
    console.log({ bodyParam });
    const updateCarById = Object.assign(Object.assign({}, carById), { id: getId, name,
        price,
        startRent,
        endRent });
    const filterUpdatedCar = cars_1.cars.filter(({ id }) => id !== getId);
    filterUpdatedCar.push(updateCarById);
    res.status(204).json({
        status: "OK",
        message: "Data updated successfully",
        cars: filterUpdatedCar
    });
    console.log({ filterUpdatedCar });
});
router.delete('/:id', (req, res) => {
    const getId = Number(req.params.id);
    const filterById = cars_1.cars.filter(({ id }) => id != getId);
    res.status(200).json({
        status: "OK",
        message: "dellete succesfully",
        cars: filterById
    });
});
router.post("/create", (req, res) => {
    const { name, price, startRent, endRent } = req.body;
    const newObj = {
        id: uuid_1.v4,
        name,
        price,
        startRent,
        endRent,
        createdAt: "08/09/20224",
        updateAt: new Date()
    };
    res.status(200).json({
        status: "OK",
        message: "create succesfully",
        data: newObj
    });
});
exports.default = router;
//# sourceMappingURL=cars.routes.js.map