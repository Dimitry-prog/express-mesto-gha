import jwt from 'jsonwebtoken';
import UserService from '../services/UserService.js';
import NotFoundError from '../errors/NotFoundError .js';
import BadRequestError from '../errors/BadRequestError.js';
import RequiredAuthError from '../errors/RequiredAuthError.js';
import ExistUserError from '../errors/ExistUserError.js';

const { NODE_ENV, JWT_SECRET } = process.env;

class UserController {
  static async getAll(req, res, next) {
    try {
      const users = await UserService.getAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  static async getSingle(req, res, next) {
    try {
      const user = await UserService.getSingle(req.params.userId);

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
  }

  static async updateProfile(req, res, next) {
    try {
      const { name, about } = req.body;
      const profile = {
        name,
        about,
      };
      const updatedProfile = await UserService.updateProfile(req.user._id, profile);

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
  }

  static async updateAvatar(req, res, next) {
    try {
      const updatedUserAvatar = await UserService
        .updateAvatar(req.user._id, req.body.avatar).validate();

      if (!updatedUserAvatar) {
        next(new NotFoundError('Avatar not found'));
      }

      return res.json(updatedUserAvatar);
    } catch (e) {
      if (e.name === 'ValidationError') {
        next(new BadRequestError());
      }
      next(e);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const authUser = await UserService.findUserByCredentials(email, password);

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
  }

  static async register(req, res, next) {
    try {
      const {
        name, about, avatar, email,
      } = req.body;
      const hash = await UserService.hashPassword(req.body.password);
      const user = await UserService.create({
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
  }

  // static async getUserInfo(req, res, next) {
  //   try {
  //     const userInfo = await UserService.getUserInfo(req.user._id);
  //
  //     if (!userInfo) {
  //       throw new NotFoundError('User profile not found');
  //     }
  //
  //     return res.json(userInfo);
  //   } catch (e) {
  //     if (e.name === 'CastError') {
  //       next(new BadRequestError());
  //     }
  //     next(e);
  //   }
  // }
}

export default UserController;
