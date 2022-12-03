import UserModal from '../models/UserModel.js';

class UserService {
  static async create(user) {
    const createUser = await UserModal.create(user);
    return createUser;
  }

  static async getAll() {
    const users = await UserModal.find();
    return users;
  }

  static async getSingle(id) {
    const user = await UserModal.findById(id);
    return user;
  }

  static async updateProfile(id, profile) {
    const updatedProfile = await UserModal
      .findByIdAndUpdate(id, profile, {
        new: true,
        runValidators: true,
      });
    return updatedProfile;
  }

  static async updateAvatar(id, avatar) {
    const updatedUserAvatar = await UserModal
      .findByIdAndUpdate(id, avatar, { new: true, runValidators: true });
    return updatedUserAvatar;
  }
}

export default UserService;
