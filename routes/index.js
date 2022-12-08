import Router from 'express';
import cardRouter from './CardRouter.js';
import userRouter from './UserRouter.js';

const router = new Router();

router.use('/cards', cardRouter);
router.use('/users', userRouter);

export default router;
