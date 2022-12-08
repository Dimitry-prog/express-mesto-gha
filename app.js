import express from 'express';
import mongoose from 'mongoose';
import { celebrate, errors, Joi } from 'celebrate';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

import userRouter from './routes/UserRouter.js';
import cardRouter from './routes/CardRouter.js';
import UserController from './controllers/UserController.js';
import handleAuthUser from './middlewares/handleAuthUser.js';
import handleErrors from './middlewares/handleErrors.js';
import { limiter, regExpForLink } from './utils/constants.js';

dotenv.config();

const PORT = 3000;
// const DB_URL = 'mongodb+srv://user:user@cluster0.deipiap.mongodb.net/?retryWrites=true&w=majority';

const DB_URL = 'mongodb://localhost:27017/mestodb';

const app = express();

app.use(helmet());
app.use(limiter);

app.use(express.json());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30)
      .default('Dimitry'),
    about: Joi.string().trim().min(2).max(30)
      .default('frontend'),
    avatar: Joi.string().trim().pattern(regExpForLink).default('https://www.lifesavvy.com/p/uploads/2020/10/269d4e5a.jpg?height=200p&trim=2,2,2,2'),
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required().min(8),
  }),
}), UserController.register);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required().min(8),
  }),
}), UserController.login);

app.use(handleAuthUser);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errors());

app.use('*', (req, res, next) => {
  const error = new Error();
  error.code = 404;
  error.name = 'NOT FOUND';
  error.message = 'NOT FOUND';
  next(error);
});

app.use(handleErrors);

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    app.listen(PORT, () => console.log('SERVER WORK!!!'));
  } catch (e) {
    throw new Error('Sever dont work today');
  }
};

startApp();
