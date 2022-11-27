import UserService from '../services/UserService.js';

class UserController {
  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
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
      console.log(e);
      return res.status(400).json({ message: 'Incorrect data' });
    }
  }

  async updateProfile(req, res) {
    try {
      const updatedProfile = await UserService.updateProfile(req.user._id, req.body);

      if (updatedProfile) {
        return res.status(200).json(updatedProfile);
      }

      if (!updatedProfile) {
        return res.status(400).json({ message: 'Incorrect data' });
      }
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: 'Not found' });
    }
  }

  async updateAvatar(req, res) {
    try {
      console.log(req.body);
      const updatedUserAvatar = await UserService.updateAvatar(req.user._id, req.body, {
        new: true,
        runValidators: true,
      });
      return res.json(updatedUserAvatar);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  }
}

export default new UserController();

// const updateProfile = async (req, res) => {
//   try {
//     const updatedProfile = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
//
//     if (updatedProfile) {
//       return res.status(200).json(updatedProfile);
//     }
//
//     if (!updatedProfile) {
//       return res.status(400).json({ message: 'Incorrect data' });
//     }
//   } catch (e) {
//     console.log(e);
//     return res.status(404).json({ message: 'Not found' });
//   }
// };
// router.patch('/users/me', updateProfile);
