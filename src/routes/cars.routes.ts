import {Router} from 'express';

const router = Router();

const { handleCreateNewCar, handleListCar, handleEditCarById, handleDeleteCar, handleGetCarById } = require('../../src/app/controllers/carsController');
const controllerAdmin = require('../../src/app/controllers/usersController')
const { mUpload } = require('../middlewares/multer');


// GET carlist
router.get("/list", handleListCar);

// create new car
router.post('/', controllerAdmin.authorizeAdmin, mUpload.single('image_url'), handleCreateNewCar);

// delete car by id
router.delete("/:id", controllerAdmin.authorizeAdmin, handleDeleteCar);

// get car by id (spesifict)
router.get('/:id', controllerAdmin.authorizeAdmin, handleGetCarById);

// Update/Edit car
router.put('/:id', controllerAdmin.authorizeAdmin, mUpload.single('image_url'), handleEditCarById);



export default router;