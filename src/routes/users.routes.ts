import {Router} from 'express';

const router = Router();

const controller = require('../../src/app/controllers/usersController');
// const { authMiddleware } = require('../../src/middlewares/authUsers');


// GET carlist
router.post("/register", controller.register);

// router.get("/", controller.getUsers);

// router.get("/:id", controller.getUserById);

// router.delete("/:id", controller.deleteUser)

router.post("/login", controller.login)

router.get('/whoami', controller.authorize, controller.whoami);



export default router;