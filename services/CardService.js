import CardModal from '../models/CardModel.js';

class CardService {
  static async create(card) {
    const createCard = await CardModal.create(card);
    return createCard;
  }

  static async getAll() {
    const cards = await CardModal.find();
    return cards;
  }

  static async removeCard(id) {
    const card = await CardModal.findByIdAndDelete(id);
    return card;
  }

  static async like(cardId, userId) {
    const like = await CardModal
      .findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true });
    return like;
  }

  static async dislike(cardId, userId) {
    const dislike = await CardModal
      .findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true });
    return dislike;
  }
}

export default CardService;
