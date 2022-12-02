import Router from 'express';
import CardController from '../controllers/CardController';

const router = new Router();

router.get('/cards', CardController.getAll);
router.post('/cards', CardController.create);
router.delete('/cards/:cardId', CardController.removeCard);
router.put('/cards/:cardId/likes', CardController.like);
router.delete('/cards/:cardId/likes', CardController.dislike);

export default router;
