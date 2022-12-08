import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import NotFoundError from '../errors/NotFoundError .js';
import BadRequestError from '../errors/BadRequestError.js';
import RequiredAuthError from '../errors/RequiredAuthError.js';
import ExistUserError from '../errors/ExistUserError.js';
import UserModel from '../models/UserModel.js';

const { NODE_ENV, JWT_SECRET } = process.env;

export const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    return res.json(users);
  } catch (e) {
    next(e);
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.userId);

    if (!user) {
      next(new NotFoundError('User not found'));
    }

    return res.json(user);
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError());
    }
    next(e);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const profile = {
      name,
      about,
    };
    const updatedProfile = await UserModel
      .findByIdAndUpdate(req.user._id, profile, {
        new: true,
        runValidators: true,
      });

    if (!updatedProfile) {
      next(new NotFoundError('Profile not found'));
    }

    return res.json(updatedProfile);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError());
    }
    next(e);
  }
};

export const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;

    const updatedProfile = await UserModel
      .findByIdAndUpdate(req.user._id, { avatar }, {
        new: true,
        runValidators: true,
      });

    if (!updatedProfile) {
      next(new NotFoundError('Profile not found'));
    }

    return res.json(updatedProfile);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError());
    }
    next(e);
  }
};

const findUserByCredentials = async (email, password) => {
  const findUser = await UserModel.findOne({ email }).select('+password');
  const checkPassword = await bcrypt.compare(password, findUser.password);
  if (!checkPassword) {
    throw new RequiredAuthError('Authorization required');
  }
  return findUser;
};

const hashingPassword = async (password) => {
  const hashPass = await bcrypt.hash(password, 10);
  return hashPass;
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const authUser = await findUserByCredentials(email, password);

    if (!authUser) {
      next(new RequiredAuthError('Authorization required'));
    }

    const token = jwt.sign(
      { _id: authUser._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );

    return res.cookie('jwt', token, {
      maxAge: 3600000,
      httpOnly: true,
    });
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError());
    }
    next(e);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email,
    } = req.body;
    const hash = await hashingPassword(req.body.password);
    const user = await UserModel.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    return res.status(201).json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError());
    }
    if (e.code === 11000) {
      next(new ExistUserError('You already registered, please login instead'));
    }
    next(e);
  }
};
