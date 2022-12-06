import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Dimitry',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'frontend',
  },
  avatar: {
    type: String,
    imageURL: String,
    default: 'https://www.lifesavvy.com/p/uploads/2020/10/269d4e5a.jpg?height=200p&trim=2,2,2,2',
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
});

export default mongoose.model('UserModel', UserModel);
