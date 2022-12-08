import CardService from '../services/CardService.js';
import BadRequestError from '../errors/BadRequestError.js';
import NotFoundError from '../errors/NotFoundError .js';

class CardController {
  static async create(req, res, next) {
    try {
      const { name, link } = req.body;
      const card = await CardService.create({ name, link });
      return res.status(201).json(card);
    } catch (e) {
      if (e.name === 'ValidationError') {
        next(new BadRequestError());
      }
      next(e);
    }
  }

  static async getAll(req, res, next) {
    try {
      const cards = await CardService.getAll();
      return res.json(cards);
    } catch (e) {
      next(e);
    }
  }

  static async removeCard(req, res, next) {
    try {
      let cards;
      if (req.body.owner._id === req.user._id) {
        cards = await CardService.removeCard(req.params.cardId);
      }

      if (!cards) {
        next(new NotFoundError('Card not found'));
      }

      return res.json(cards);
    } catch (e) {
      if (e.name === 'CastError') {
        next(new BadRequestError());
      }
      next(e);
    }
  }

  static async like(req, res, next) {
    try {
      const like = await CardService
        .like(req.params.cardId, req.user._id);

      if (!like) {
        next(new NotFoundError('Card like not found'));
      }

      return res.json(like);
    } catch (e) {
      if (e.name === 'CastError') {
        next(new BadRequestError());
      }
      next(e);
    }
  }

  static async dislike(req, res, next) {
    try {
      const dislike = await CardService
        .dislike(req.params.cardId, req.user._id);

      if (!dislike) {
        next(new NotFoundError('Card dislake not found'));
      }

      return res.json(dislike);
    } catch (e) {
      if (e.name === 'CastError') {
        next(new BadRequestError());
      }
      next(e);
    }
  }
}

export default CardController;
