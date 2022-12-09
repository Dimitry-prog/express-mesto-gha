import mongoose from 'mongoose';
import BadRequestError from '../errors/BadRequestError.js';
import NotFoundError from '../errors/NotFoundError .js';
import CardModel from '../models/CardModel.js';
import { httpStatusCode } from '../utils/constants.js';

export const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await CardModel.create({ name, link, owner: req.user._id });
    return res.status(httpStatusCode.created).json(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError());
    } else {
      next(e);
    }
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

    if (!card) {
      next(new NotFoundError('Card not found'));
    }
    if (card.owner._id === req.user._id) {
      await card.remove();
    }

    return res.json({
      message: 'Card has been deleted',
    });
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError());
    } else {
      next(e);
    }
  }
};

const updateStatusCard = async (id, options, next) => {
  try {
    const status = await CardModel
      .findByIdAndUpdate(id, options, { new: true })
      .populate(['likes']);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      next(new BadRequestError());
    }
    if (!status) {
      next(new NotFoundError('Card not found'));
    }
    return status;
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError());
    } else {
      next(e);
    }
  }
};

export const likeCard = async (req, res, next) => {
  await updateStatusCard(req.params.cardId, { $addToSet: { likes: req.user._id } }, next);
  return res.json({
    message: 'Like has been added',
  });
};

export const dislikeCard = async (req, res, next) => {
  await updateStatusCard(req.params.cardId, { $pull: { likes: req.user._id } }, next);
  return res.json({
    message: 'Like has been deleted',
  });
};
