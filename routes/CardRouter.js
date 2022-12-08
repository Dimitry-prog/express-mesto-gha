import Router from 'express';
import CardController from '../controllers/CardController.js';

const router = new Router();

router.get('/', CardController.getAll);
router.post('/', CardController.create);
router.delete('/:cardId', CardController.removeCard);
router.put('/:cardId/likes', CardController.like);
router.delete('/:cardId/likes', CardController.dislike);

export default router;
