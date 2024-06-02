import {Router, Request, Response} from 'express';
const cloudinary = require('../config/cloudinary')



const router = Router();

const { handleCreateNewCar, handleListCar, handleEditCarById, handleDeleteCar, handleGetCarById } = require('../../src/app/controllers/carsController');
const { mUpload } = require('../middlewares/multer');


// GET carlist
router.get("/", handleListCar);

// create new car
router.post('/create', mUpload.single('file'), handleCreateNewCar);

// delete car by id
router.delete("/:id", handleDeleteCar);

// get car by id (spesifict)
router.get('/:id', handleGetCarById);

// Update/Edit car
router.put('/:id', mUpload.single('file'), handleEditCarById);



export default router;