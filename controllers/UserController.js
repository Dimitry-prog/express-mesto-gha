import mongoose from 'mongoose';
import NotFoundError from '../errors/NotFoundError .js';
import BadRequestError from '../errors/BadRequestError.js';
import UserModel from '../models/UserModel.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    return res.json(users);
  } catch (e) {
    // Привет, на catch(next); почему-то линтер ругается
    // подскажите, пожалуйста, как надо было использовать
    // services в правильном ключе?
    // telegram https://t.me/Dmitry_Myt для связи, спасибо =)
    return next(e);
  }
};

const getUserById = async (id, next) => {
  try {
    const user = await UserModel.findById(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      next(new BadRequestError());
    }
    if (!user) {
      next(new NotFoundError('User not found'));
    }

    return user;
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError());
    }
    return next(e);
  }
};

export const getSingleUser = async (req, res, next) => {
  const user = await getUserById(req.params.userId, next);
  return res.json(user);
};

export const getUserInfo = async (req, res, next) => {
  const user = await getUserById(req.user._id, next);
  return res.json(user);
};

const updateProfileById = async (id, data, next) => {
  try {
    const updatedProfile = await UserModel
      .findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      next(new BadRequestError());
    }
    if (!updatedProfile) {
      next(new NotFoundError('Profile not found'));
    }

    return updatedProfile;
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError());
    }
    return next(e);
  }
};

export const updateUserProfile = async (req, res, next) => {
  const { name, about } = req.body;
  const data = {
    name,
    about,
  };
  const updatedProfile = await updateProfileById(req.user._id, data, next);
  return res.json(updatedProfile);
};

export const updateUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  const data = {
    avatar,
  };
  const updatedProfile = await updateProfileById(req.user._id, data, next);
  return res.json(updatedProfile);
};
