import UserModal from '../models/UserModel.js';

class UserService {
  async create(user) {
    if (!user) {
      throw new Error('Something went wrong');
    }
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
    if (!id) {
      throw new Error('Something went wrong');
    }
    const user = await UserModal.findById(id);
    return user;
  }

  async updateProfile(id) {
    if (!id) {
      throw new Error('We cant find this user');
    }
    const updatedProfile = await UserModal.findByIdAndUpdate(id, { new: true });
    return updatedProfile;
  }

  async updateAvatar(id) {
    if (!id) {
      throw new Error('We cant find this user');
    }
    const updatedUserAvatar = await UserModal.findByIdAndUpdate(id, { new: true });
    return updatedUserAvatar;
  }
}

export default new UserService();
