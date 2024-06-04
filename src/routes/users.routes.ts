import {Router} from 'express';

const router = Router();

const controller = require('../../src/app/controllers/usersController');
// const { authMiddleware } = require('../../src/middlewares/authUsers');


router.post("/auth/register_user", controller.registerUser);

router.post("/auth/register_admin", controller.authorizeSuperAdmin, controller.registerAdmin);

router.delete("/:id", controller.authorizeAdmin, controller.deleteUser)

router.post("/auth/login", controller.login)

router.get('/auth/whoami', controller.authorize, controller.whoami);



export default router;