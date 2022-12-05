import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel.js';

class UserService {
  static async create(user) {
    const createUser = await UserModel.create(user);
    return createUser;
  }

  static async getAll() {
    const users = await UserModel.find();
    return users;
  }

  static async getSingle(id) {
    const user = await UserModel.findById(id);
    return user;
  }

  static async updateProfile(id, profile) {
    const updatedProfile = await UserModel
      .findByIdAndUpdate(id, profile, {
        new: true,
        runValidators: true,
      });
    return updatedProfile;
  }

  static async updateAvatar(id, userAvatar) {
    const updatedUserAvatar = await UserModel
      .findByIdAndUpdate(id, { avatar: userAvatar }, { new: true, runValidators: true });
    return updatedUserAvatar;
  }

  static async findUserByCredentials(email, password) {
    const findUser = await UserModel.find({ email });
    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (!checkPassword) {
      throw new Error({ message: 'Not valid password' });
    }
    return findUser;
  }

  static async hashPassword(password) {
    const hashingPasswod = await bcrypt.hash(password, 10);
    return hashingPasswod;
  }

  static async getUserInfo(id) {
    const userInfo = await UserModel.findById(id);
    return userInfo;
  }
}

export default UserService;
