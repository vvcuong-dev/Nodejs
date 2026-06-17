import { Router } from 'express';
import { dashboardController } from '../controllers/admin/dashboard.controller';
import { userController } from '../controllers/admin/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { userSchema } from '../validators/user.validator';
const adminRouter: Router = Router();

adminRouter.get('/', dashboardController.index);
adminRouter.get('/users', userController.index);
adminRouter.get('/users/create', userController.create);
adminRouter.post('/users/create', validate(userSchema), userController.store);
adminRouter.get('/users/:email', userController.find);


export default adminRouter;