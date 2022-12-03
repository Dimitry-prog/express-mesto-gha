import Router from 'express';
import UserController from '../controllers/UserController.js';

const router = new Router();

router.get('/users', UserController.getAll);
router.get('/users/:userId', UserController.getSingle);
router.post('/users', UserController.create);
router.patch('/users/me', UserController.updateProfile);
router.patch('/users/me/avatar', UserController.updateAvatar);

export default router;
