import BadRequestError from '../errors/BadRequestError.js';
import NotFoundError from '../errors/NotFoundError .js';
import CardModel from '../models/CardModel.js';

export const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await CardModel.create({ name, link });
    return res.status(201).json(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError());
    }
    next(e);
  }
};

export const getCards = async (req, res, next) => {
  try {
    const cards = await CardModel.find().populate(['owner', 'likes']);
    return res.json(cards);
  } catch (e) {
    next(e);
  }
};

export const deleteCard = async (req, res, next) => {
  try {
    const card = await CardModel.findById(req.params.cardId);
    if (card.owner._id === req.user._id) {
      await CardModel.findByIdAndDelete(req.params.cardId);
    }

    if (!card) {
      next(new NotFoundError('Card not found'));
    }

    return res.json(card);
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError());
    }
    next(e);
  }
};

export const likeCard = async (req, res, next) => {
  try {
    const like = await CardModel
      .findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .populate(['owner', 'likes']);

    if (!like) {
      next(new NotFoundError('Card like not found'));
    }

    return res.json(like);
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError());
    }
    next(e);
  }
};

export const dislikeCard = async (req, res, next) => {
  try {
    const dislike = await CardModel
      .findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
      .populate(['likes']);

    if (!dislike) {
      next(new NotFoundError('Card dislike not found'));
    }

    return res.json(dislike);
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError());
    }
    next(e);
  }
};
