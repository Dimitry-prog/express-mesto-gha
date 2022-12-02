import UserService from '../services/UserService.js';

class UserController {
  async create(req, res) {
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

  async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      return res.json(users);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async getSingle(req, res) {
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

  async updateProfile(req, res) {
    try {
      const updatedProfile = await UserService.updateProfile(req.user._id, req.body);

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

  async updateAvatar(req, res) {
    try {
      const updatedUserAvatar = await UserService.updateAvatar(req.user._id, req.body);
      return res.json(updatedUserAvatar);
    } catch (e) {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        return res.status(400).json({ message: 'Incorrect data' });
      }
      return res.status(500).json({ message: 'Server not work' });
    }
  }
}

export default new UserController();
