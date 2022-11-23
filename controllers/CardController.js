import CardService from '../services/CardService.js';

class CardController {
  async create(req, res) {
    try {
      const id = req.user._id;
      const card = await CardService.create({ ...req.body, owner: id });
      return res.json(card);
    } catch (e) {
      if (res.statusCode === 400) {
        return res.status(400).json(e.message);
      }
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const cards = await CardService.getAll();
      return res.json(cards);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async removeCard(req, res) {
    try {
      console.log(req.params);
      const cards = await CardService.removeCard(req.params.cardId);
      return res.json(cards);
    } catch (e) {
      if (res.statusCode === 404) {
        return res.status(400).json(e.message);
      }
      res.status(500).json(e.message);
    }
  }

  async like(req, res) {
    try {
      const like = await CardService.like(req.params.cardId, { $addToSet: { likes: req.user._id } });
      return res.json(like);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async dislike(req, res) {
    try {
      const dislike = await CardService.dislike(req.params.cardId, { $pull: { likes: req.user._id } });
      return res.json(dislike);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new CardController();
