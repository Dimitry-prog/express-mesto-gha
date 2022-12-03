import UserService from '../services/UserService.js';

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

  // static async updateProfile(req, res) {
  //   try {
  //     const id = req.user._id;
  //     const user = await UserModel
  //       .findByIdAndUpdate(id, { name: req.body.name, about: req.body.about }, {
  //         new: true,
  //         runValidators: true,
  //       });
  //
  //     if (!user) {
  //       return res.status(404).json({ message: 'Not found' });
  //     }
  //
  //     return res.json(user);
  //   } catch (e) {
  //     if (e.name === 'ValidationError' || e.name === 'CastError') {
  //       return res.status(400).json({ message: 'Incorrect data' });
  //     }
  //     return res.status(500).json({ message: 'Server not work' });
  //   }
  // }
  //
  // static async updateAvatar(req, res) {
  //   try {
  //     const id = req.user._id;
  //     const user = await UserModel.findByIdAndUpdate(id, { avatar: req.body.avatar }, {
  //       new: true,
  //       runValidators: true,
  //     });
  //
  //     if (!user) {
  //       return res.status(404).json({ message: 'Not found' });
  //     }
  //
  //     return res.json(user);
  //   } catch (e) {
  //     if (e.name === 'ValidationError' || e.name === 'CastError') {
  //       return res.status(400).json({ message: 'Incorrect data' });
  //     }
  //     return res.status(500).json({ message: 'Server not work' });
  //   }
  // }

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
        .updateAvatar(req.user._id, req.body.avatar);

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
}

export default UserController;
