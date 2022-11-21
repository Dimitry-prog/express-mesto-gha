import User from '../models/User.js';

class UserService {
  async create(user) {
    const createUser = await User.create(user);
    return createUser;
  }

  async getAll() {
    const users = await User.find();
    return users;
  }

  async getSingle(id) {
    if (!id) {
      throw new Error('We cant find this user in our base');
    }
    const user = await User.findById(id);
    return user;
  }

  async updateProfile(id, user) {
    if (!id) {
      throw new Error('We cant find this user in our base');
    }
    const updatedProfile = await User.findByIdAndUpdate(id, user, { new: true });
    return updatedProfile;
  }

  async updateAvatar(id, user) {
    if (!id) {
      throw new Error('We cant find this user in our base');
    }
    const updatedUserAvatar = await User.findByIdAndUpdate(id, user, { new: true });
    return updatedUserAvatar;
  }
}

export default new UserService();
