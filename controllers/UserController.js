import UserService from '../services/UserService.js';

class UserController {
  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      return res.json(user);
    } catch (e) {
      if (res.statusCode === 400) {
        return res.status(400).json(e.message);
      }
      if (res.statusCode === 404) {
        return res.status(404).json(e.message);
      }
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      return res.json(users);
    } catch (e) {
      res.status(500).json(e.message);
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
      console.log(e);
      return res.status(500).json({ message: 'Server' });
    }
  }

  async updateProfile(req, res) {
    try {
      const updatedProfile = await UserService.updateProfile(req.user._id, req.body);
      return res.json(updatedProfile);
    } catch (e) {
      if (res.statusCode === 400) {
        return res.status(400).json(e.message);
      }
      res.status(500).json(e.message);
    }
  }

  async updateAvatar(req, res) {
    try {
      const updatedUserAvatar = await UserService.updateAvatar(req.user._id, req.body);
      return res.json(updatedUserAvatar);
    } catch (e) {
      if (res.statusCode === 400) {
        return res.status(400).json(e.message);
      }
      res.status(500).json(e.message);
    }
  }
}

export default new UserController();
