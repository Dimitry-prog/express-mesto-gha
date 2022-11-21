import Card from '../models/Card.js';

class CardService {
  async create(card) {
    const createCard = await Card.create(card);
    return createCard;
  }

  async getAll() {
    const cards = await Card.find();
    return cards;
  }

  async removecard(id) {
    if (!id) {
      throw new Error('We cant find this card');
    }
    const card = await Card.findByIdAndDelete(id);
    return card;
  }

  async like(id, card) {
    if (!card._id) {
      throw new Error('We cant find this card');
    }
    const like = await Card.findByIdAndUpdate(card._id, card, { new: true });
    return like;
  }

  async dislike(id, card) {
    if (!card._id) {
      throw new Error('We cant find this card');
    }
    const dislike = await Card.findByIdAndUpdate(card._id, card, { new: true });
    return dislike;
  }

  async removeLike(id) {
    if (!id) {
      throw new Error('We cant find this card');
    }
    const likes = await Card.findByIdAndDelete(id);
    return likes;
  }
}

export default new CardService();
