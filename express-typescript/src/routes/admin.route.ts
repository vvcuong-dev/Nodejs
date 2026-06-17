import { Router } from 'express';
import { dashboardController } from '../controllers/admin/dashboard.controller';
import { userController } from '../controllers/admin/user.controller';
const adminRouter: Router = Router();

adminRouter.get('/', dashboardController.index);
adminRouter.get('/users', userController.index);
adminRouter.get('/users/:email', userController.find);


export default adminRouter;