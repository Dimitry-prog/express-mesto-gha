import CardModal from '../models/CardModel.js';

class CardService {
  async create(card) {
    if (!card) {
      throw new Error('Something went wrong');
    }
    const createCard = await CardModal.create(card);
    return createCard;
  }

  async getAll() {
    try {
      const cards = await CardModal.find();
      return cards;
    } catch (e) {
      throw new Error('Something went wrong');
    }
  }

  async removeCard(id) {
    if (!id) {
      throw new Error('We cant find this card');
    }
    const card = await CardModal.findByIdAndDelete(id);
    return card;
  }

  async like(id, card) {
    if (!id) {
      throw new Error('We cant find this card');
    }
    const like = await CardModal.findByIdAndUpdate(id, card, { new: true });
    return like;
  }

  async dislike(id, card) {
    if (!id) {
      throw new Error('We cant find this card');
    }
    const dislike = await CardModal.findByIdAndUpdate(id, card, { new: true });
    return dislike;
  }
}

export default new CardService();
