import jwt from 'jsonwebtoken';
import UserService from '../services/UserService.js';
import NotFoundError from '../errors/NotFoundError .js';
import BadRequest from '../errors/BadRequest.js';
import RequiredAuth from '../errors/RequiredAuth.js';
import ExistUser from '../errors/ExistUser.js';

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
        throw new NotFoundError('User not found');
      }

      return res.json(user);
    } catch (e) {
      if (e.name === 'CastError') {
        throw new BadRequest();
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
        throw new NotFoundError('Profile not found');
      }

      return res.json(updatedProfile);
    } catch (e) {
      if (e.name === 'ValidationError') {
        throw new BadRequest();
      }
      next(e);
    }
  }

  static async updateAvatar(req, res, next) {
    try {
      const updatedUserAvatar = await UserService
        .updateAvatar(req.user._id, req.body.avatar).validate();

      if (!updatedUserAvatar) {
        throw new NotFoundError('Avatar not found');
      }

      return res.json(updatedUserAvatar);
    } catch (e) {
      if (e.name === 'ValidationError') {
        throw new BadRequest();
      }
      next(e);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const authUser = await UserService.findUserByCredentials(email, password);

      if (!authUser) {
        throw new RequiredAuth('Authorization required');
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
        throw new BadRequest();
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
        throw new BadRequest();
      }
      if (e.code === 11000) {
        throw new ExistUser('You already registered, please login instead');
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
  //       throw new BadRequest();
  //     }
  //     next(e);
  //   }
  // }
}

export default UserController;
