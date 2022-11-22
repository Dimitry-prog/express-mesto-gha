import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  avatar: {
    type: String,
    imageURL: String,
    required: true,
  },
});

export default mongoose.model('UserModel', UserModel);
