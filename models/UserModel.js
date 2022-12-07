import mongoose from 'mongoose';

const regExp = /(^https?:\/\/[w{3}]?.?[a-zA-z0-9-]{1,}[\.\w{2,}]*)[\/\w{1,}]*/g;

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
    validate: {
      validator(v) {
        return regExp.test(v);
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
    minLength: 8,
    required: true,
  },
});

export default mongoose.model('UserModel', UserModel);
