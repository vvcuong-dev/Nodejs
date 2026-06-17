import { Router } from 'express';
import { userController } from '../controllers/api/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { userSchema } from '../validators/user.validator';
import { validate } from '../middlewares/validate.middleware';

const router: Router = Router();

router.get('/users', authMiddleware, userController.index);
router.post('/users', validate(userSchema), userController.create);

export default router;