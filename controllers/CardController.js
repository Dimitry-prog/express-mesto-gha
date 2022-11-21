import CardService from '../services/CardService.js';

class CardController {
  async create(req, res) {
    try {
      const id = req.user._id;
      const card = await CardService.create({ ...req.body, owner: id });
      return res.json(card);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getAll(req, res) {
    try {
      const cards = await CardService.getAll();
      return res.json(cards);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async removeCard(req, res) {
    try {
      const cards = await CardService.removecard(req.params.id);
      return res.json(cards);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async like(req, res) {
    try {
      const like = await CardService.like(req.params.id, { $addToSet: { likes: req.user._id } });
      return res.json(like);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async dislike(req, res) {
    try {
      const dislike = await CardService.like(req.params.id, { $pull: { likes: req.user._id } });
      return res.json(dislike);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async removeLike(req, res) {
    try {
      const likes = await CardService.removeLike(req.params.id);
      return res.json(likes);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

export default new CardController();
