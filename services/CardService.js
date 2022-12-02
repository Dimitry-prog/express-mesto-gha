import CardModal from '../models/CardModel';

class CardService {
  async create(card) {
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
    const card = await CardModal.findByIdAndDelete(id);
    return card;
  }

  async like(id) {
    const like = await CardModal.findByIdAndUpdate(id, { new: true });
    return like;
  }

  async dislike(id) {
    const dislike = await CardModal.findByIdAndUpdate(id, { new: true });
    return dislike;
  }
}

export default new CardService();
