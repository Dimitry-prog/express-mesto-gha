import mongoose from 'mongoose';

const User = new mongoose.Schema({
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
    imageURL: String,
    required: true,
  },
});

export default mongoose.model('User', User);
