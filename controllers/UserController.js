import jwt from 'jsonwebtoken';
import UserService from '../services/UserService.js';

const { NODE_ENV, JWT_SECRET } = process.env;

class UserController {
  static async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      return res.json(user);
    } catch (e) {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        return res.status(400).json({ message: 'Incorrect data' });
      }
      return res.status(500).json({ message: 'Server not work' });
    }
  }

  static async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      return res.json(users);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  static async getSingle(req, res) {
    try {
      const user = await UserService.getSingle(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json(user);
    } catch (e) {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        return res.status(400).json({ message: 'Incorrect data' });
      }
      return res.status(500).json({ message: 'Server not work' });
    }
  }

  static async updateProfile(req, res) {
    try {
      const { name, about } = req.body;
      const profile = {
        name,
        about,
      };
      const updatedProfile = await UserService.updateProfile(req.user._id, profile);

      if (!updatedProfile) {
        return res.status(404).json({ message: 'Not found' });
      }

      return res.json(updatedProfile);
    } catch (e) {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        return res.status(400).json({ message: 'Incorrect data' });
      }
      return res.status(500).json({ message: 'Server not work' });
    }
  }

  static async updateAvatar(req, res) {
    try {
      const updatedUserAvatar = await UserService
        .updateAvatar(req.user._id, req.body.avatar).validate();

      if (!updatedUserAvatar) {
        return res.status(404).json({ message: 'Not found' });
      }

      return res.json(updatedUserAvatar);
    } catch (e) {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        return res.status(400).json({ message: 'Incorrect data' });
      }
      return res.status(500).json({ message: 'Server not work' });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const authUser = await UserService.findUserByCredentials(email, password);

      if (!authUser) {
        return res.status(401).json({ message: 'PASSWORD' });
      }

      const token = jwt.sign(
        { _id: authUser._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      });

      return res.send({
        token,
      });
    } catch (e) {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        return res.status(400).json({ message: 'Incorrect data' });
      }
      return res.status(500).json({ message: 'Server not work' });
    }
  }

  static async register(req, res) {
    try {
      const hash = await UserService.hashPassword(req.body.password);
      const user = await UserService.create({
        email: req.body.email,
        password: hash,
      });
      return res.status(201).json({
        _id: user._id,
        email: user.email,
      });
    } catch (e) {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        return res.status(400).json({ message: 'Incorrect data' });
      }
      return res.status(500).json({ message: 'Server not work' });
    }
  }

  static async getUserInfo(req, res) {
    try {
      const userInfo = await UserService.getUserInfo(req.user._id);

      if (!userInfo) {
        return res.status(404).json({ message: 'Not found' });
      }

      return res.json(userInfo);
    } catch (e) {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        return res.status(400).json({ message: 'Incorrect data' });
      }
      return res.status(500).json({ message: 'Server not work' });
    }
  }
}

export default UserController;
