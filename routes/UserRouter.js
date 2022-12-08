import Router from 'express';
import UserController from '../controllers/UserController.js';

const router = new Router();

router.get('/', UserController.getAll);
router.get('/:userId', UserController.getSingle);
// router.post('/users', UserController.create);
// router.get('/me', UserController.getUserInfo);
router.patch('/me', UserController.updateProfile);
router.patch('/me/avatar', UserController.updateAvatar);

export default router;
