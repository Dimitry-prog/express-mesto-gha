import User from '../models/User';

class UserService {
  async create(user) {
    const createUser = await User.create({ ...user });
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
}

export default new UserService();
