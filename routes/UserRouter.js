import Router from 'express';
import {
  getSingleUser, getUsers, updateUserAvatar, updateUserProfile,
} from '../controllers/UserController.js';

const router = new Router();

router.get('/', getUsers);
router.get('/:userId', getSingleUser);
// router.post('/users', UserController.create);
// router.get('/me', UserController.getUserInfo);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

export default router;
