import CardService from '../services/CardService.js';
import ApiError from '../errors/ApiError.js';
import BadRequest from '../errors/BadRequest.js';

class CardController {
  static async create(req, res, next) {
    try {
      const id = req.user._id;
      const card = await CardService.create({ ...req.body, owner: id });
      return res.json(card);
    } catch (e) {
      if (e.name === 'ValidationError') {
        throw new BadRequest();
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
      const cards = await CardService.removeCard(req.params.cardId);

      if (!cards) {
        return ApiError.notFound('Card not found');
      }

      return res.json(cards);
    } catch (e) {
      if (e.name === 'CastError') {
        throw new BadRequest();
      }
      next(e);
    }
  }

  static async like(req, res, next) {
    try {
      const like = await CardService
        .like(req.params.cardId, req.user._id);

      if (!like) {
        return ApiError.notFound('Card like not found');
      }

      return res.json(like);
    } catch (e) {
      if (e.name === 'CastError') {
        throw new BadRequest();
      }
      next(e);
    }
  }

  static async dislike(req, res, next) {
    try {
      const dislike = await CardService
        .dislike(req.params.cardId, req.user._id);

      if (!dislike) {
        return ApiError.notFound('Card dislake not found');
      }

      return res.json(dislike);
    } catch (e) {
      if (e.name === 'CastError') {
        throw new BadRequest();
      }
      next(e);
    }
  }
}

export default CardController;
