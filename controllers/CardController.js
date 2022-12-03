import CardService from '../services/CardService.js';

class CardController {
  static async create(req, res) {
    try {
      const id = req.user._id;
      const card = await CardService.create({ ...req.body, owner: id });
      return res.json(card);
    } catch (e) {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        return res.status(400).json({ message: 'Incorrect data' });
      }
      return res.status(500).json({ message: 'Server not work' });
    }
  }

  static async getAll(req, res) {
    try {
      const cards = await CardService.getAll();
      return res.json(cards);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  static async removeCard(req, res) {
    try {
      const cards = await CardService.removeCard(req.params.cardId);

      if (!cards) {
        return res.status(404).json({ message: 'Card not found' });
      }

      return res.json(cards);
    } catch (e) {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        return res.status(400).json({ message: 'Incorrect data' });
      }
      return res.status(500).json({ message: 'Server not work' });
    }
  }

  static async like(req, res) {
    try {
      const like = await CardService
        .like(req.params.cardId, req.user._id);

      if (!like) {
        return res.status(404).json({ message: 'Card not found' });
      }

      return res.json(like);
    } catch (e) {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        return res.status(400).json({ message: 'Incorrect data' });
      }
      return res.status(500).json({ message: 'Server not work' });
    }
  }

  static async dislike(req, res) {
    try {
      const dislike = await CardService
        .dislike(req.params.cardId, req.user._id);

      if (!dislike) {
        return res.status(404).json({ message: 'Incorrect id' });
      }

      return res.json(dislike);
    } catch (e) {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        return res.status(400).json({ message: 'Incorrect data' });
      }
      return res.status(500).json({ message: 'Server not work' });
    }
  }
}

export default CardController;
