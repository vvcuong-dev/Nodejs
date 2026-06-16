import { Router } from 'express';
import { HomeController } from '../controllers/home.controller';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { guestMiddleware } from '../middlewares/guest.middleware';
import adminRouter from './admin.route';

const router: Router = Router();


router.get('/', HomeController.index);
router.get('/auth/login', guestMiddleware, authController.login);

router.use('/admin',authMiddleware, adminRouter); 

export default router;