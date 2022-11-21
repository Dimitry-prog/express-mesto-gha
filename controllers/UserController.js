import UserService from '../services/UserService.js';

class UserController {
  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      return res.json(user);
    } catch (e) {
      console.log(e);
      if (res.statusCode === 400) {
        throw new Error('Incorrect data');
      }
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
      console.log(req.params);
      const user = await UserService.getSingle(req.params.userId);
      return res.json(user);
    } catch (e) {
      console.log(e);
      if (res.statusCode === 404) {
        throw new Error('We dont have this user');
      }
      res.status(500).json(e);
    }
  }

  async updateProfile(req, res) {
    try {
      const updatedProfile = await UserService.updateProfile(req.user._id, req.body);
      return res.json(updatedProfile);
    } catch (e) {
      console.log(e);
      if (res.statusCode === 400) {
        throw new Error('Incorrect data');
      }
      res.status(500).json(e);
    }
  }

  async updateAvatar(req, res) {
    try {
      const updatedUserAvatar = await UserService.updateAvatar(req.user._id, req.body);
      return res.json(updatedUserAvatar);
    } catch (e) {
      console.log(e);
      if (res.statusCode === 400) {
        throw new Error('Incorrect data');
      }
      res.status(500).json(e);
    }
  }
}

export default new UserController();
