import Router from 'express';
import UserController from '../controllers/UserController.js';

const router = new Router();

router.get('/users', UserController.getAll);
router.get('/users/:userId', UserController.getSingle);
router.post('/users', UserController.create);
router.path('/users/me', UserController.updateProfile);
router.path('/users/me/avatar', UserController.updateAvatar);

export default router;
