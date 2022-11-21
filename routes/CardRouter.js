import Router from 'express';
import CardController from '../controllers/CardController.js';

const router = new Router();

router.get('/cards', CardController.getAll);
router.post('/cards', CardController.create);
router.delete('/cards/:cardId', CardController.removeCard);
router.put('/cards/:cardId/likes', CardController.like);
router.put('/cards/:cardId/likes', CardController.dislike);
router.delete('/cards/:cardId/likes', CardController.removeLike);

export default router;
