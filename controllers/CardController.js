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

  async remove(req, res) {
    try {
      const cards = await CardService.remove(req.params.id);
      return res.json(cards);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

export default new CardController();
