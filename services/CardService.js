import CardModel from '../models/CardModel.js';

class CardService {
  static async create(card) {
    const createCard = await CardModel.create(card);
    return createCard;
  }

  static async getAll() {
    const cards = await CardModel.find().populate(['owner', 'likes']);
    return cards;
  }

  static async removeCard(id) {
    const card = await CardModel.findByIdAndDelete(id);
    return card;
  }

  static async like(cardId, userId) {
    const like = await CardModel
      .findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true }).populate(['owner', 'likes']);
    return like;
  }

  static async dislike(cardId, userId) {
    const dislike = await CardModel
      .findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true }).populate(['likes']);
    return dislike;
  }
}

export default CardService;
