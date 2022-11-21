import Card from '../models/Card.js';

class CardService {
  async create(card) {
    if (!card) {
      throw new Error('Something went wrong');
    }
    const createCard = await Card.create(card);
    return createCard;
  }

  async getAll() {
    try {
      const cards = await Card.find();
      return cards;
    } catch (e) {
      console.log(e);
    }
  }

  async removeCard(id) {
    if (!id) {
      throw new Error('We cant find this card');
    }
    const card = await Card.findByIdAndDelete(id);
    return card;
  }

  async like(id, card) {
    if (!id) {
      throw new Error('We cant find this card');
    }
    const like = await Card.findByIdAndUpdate(id, card, { new: true });
    return like;
  }

  async dislike(id, card) {
    if (!id) {
      throw new Error('We cant find this card');
    }
    const dislike = await Card.findByIdAndUpdate(id, card, { new: true });
    return dislike;
  }
}

export default new CardService();
