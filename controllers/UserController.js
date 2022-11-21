import UserService from '../services/UserService.js';

class UserController {
  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      return res.json(user);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      return res.json(users);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getSingle(req, res) {
    try {
      const user = await UserService.getSingle(req.params.id);
      return res.json(user);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async updateProfile(req, res) {
    try {
      const updatedUserProfile = await UserService.updateProfile(req.body);
      return res.json(updatedUserProfile);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async updateAvatar(req, res) {
    try {
      const updatedUserAvatar = await UserService.updateAvatar(req.body);
      return res.json(updatedUserAvatar);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

export default new UserController();
