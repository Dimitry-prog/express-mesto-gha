import mongoose from 'mongoose';
import { regExpForLink } from '../utils/constants.js';

const userModel = new mongoose.Schema({
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
    validate: {
      validator(v) {
        return regExpForLink.test(v);
      },
      message: (props) => `${props.value} is not valid link!`,
    },
    default: 'https://www.lifesavvy.com/p/uploads/2020/10/269d4e5a.jpg?height=200p&trim=2,2,2,2',
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default mongoose.model('userModel', userModel);
