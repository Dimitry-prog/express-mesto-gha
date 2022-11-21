import User from '../models/User.js';

class UserService {
  async create(user) {
    if (!user) {
      throw new Error('Something went wrong');
    }
    const createUser = await User.create(user);
    return createUser;
  }

  async getAll() {
    try {
      const users = await User.find();
      return users;
    } catch (e) {
      console.log(e);
    }
  }

  async getSingle(id) {
    if (!id) {
      throw new Error('We cant find this user');
    }
    const user = await User.findById(id);
    return user;
  }

  async updateProfile(id, user) {
    if (!id) {
      throw new Error('We cant find this user');
    }
    const updatedProfile = await User.findByIdAndUpdate(id, user, { new: true });
    return updatedProfile;
  }

  async updateAvatar(id, user) {
    if (!id) {
      throw new Error('We cant find this user');
    }
    const updatedUserAvatar = await User.findByIdAndUpdate(id, user, { new: true });
    return updatedUserAvatar;
  }
}

export default new UserService();
