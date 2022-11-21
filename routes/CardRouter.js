import Router from 'express';
import CardController from '../controllers/CardController.js';

const router = new Router();

router.get('/cards', CardController.getAll);
router.post('/cards', CardController.create);
router.delete('/cards/:cardId', CardController.remove);

export default router;
