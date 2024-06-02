// authenticateUser, authorizeSuperadmin

import {Router} from 'express';

const router = Router();

const { authenticateUser, authorizeSuperadmin } = require('../../src/middlewares/authAdmin');
const controller = require('../../src/app/controllers/adminsController');


// GET carlist
router.delete("/delete/:id", authenticateUser, authorizeSuperadmin, controller.deleteAdmin);

router.get("/", controller.getAdmins)

// router.get("/", controller.getUsers);

// router.get("/:id", controller.getUserById);

// router.delete("/:id", controller.deleteUser)
router.post("/login", controller.login)



export default router;