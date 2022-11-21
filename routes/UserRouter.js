import Router from 'express';
import UserController from '../controllers/UserController.js';

const router = new Router();

router.get('/users', UserController.getAll);
router.get('/users/:userId', UserController.getSingle);
router.post('/users', UserController.create);

export default router;
