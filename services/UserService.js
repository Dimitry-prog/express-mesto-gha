import UserModal from '../models/UserModel.js';

class UserService {
  async create(user) {
    const createUser = await UserModal.create(user);
    return createUser;
  }

  async getAll() {
    try {
      const users = await UserModal.find();
      return users;
    } catch (e) {
      throw new Error('Something went wrong');
    }
  }

  async getSingle(id) {
    const user = await UserModal.findById(id);
    return user;
  }

  async updateProfile(id, profile) {
    const updatedProfile = await UserModal.findByIdAndUpdate(id, profile, {
      new: true,
      runValidators: true,
    });
    return updatedProfile;
  }

  async updateAvatar(id, avatar) {
    const updatedUserAvatar = await UserModal.findByIdAndUpdate(id, avatar, { new: true, runValidators: true });
    return updatedUserAvatar;
  }
}

export default new UserService();
