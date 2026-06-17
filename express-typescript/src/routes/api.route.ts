import { Router } from 'express';
import { userController } from '../controllers/api/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/users', authMiddleware, userController.index);

export default router;