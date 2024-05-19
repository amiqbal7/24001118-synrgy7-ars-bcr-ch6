import {Router, Request, Response} from 'express';
const cloudinary = require('../config/cloudinary')



const router = Router();

const { handleCreateNewCar, handleListCar, handleEditCarById, handleDeleteCar, handleGetCarById } = require('../handlers/car.ts');
const { mUpload } = require('../middlewares/multer');

interface ArrList {
    id: number;
    name: string;
    price: string;
    startRent: string;
    endRent: string;
    createdAt: string;
    updatedAt: string;
}


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