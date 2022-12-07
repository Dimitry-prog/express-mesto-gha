import express from 'express';
import mongoose from 'mongoose';
import { celebrate, errors, Joi } from 'celebrate';
import escape from 'escape-html';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import userRouter from './routes/UserRouter.js';
import cardRouter from './routes/CardRouter.js';
import UserController from './controllers/UserController.js';
import handleAuthUser from './middlewares/handleAuthUser.js';
// import handleErrors from './middlewares/handleErrors.js';

dotenv.config();

const PORT = 3000;
// const DB_URL = 'mongodb+srv://user:user@cluster0.deipiap.mongodb.net/?retryWrites=true&w=majority';

const DB_URL = 'mongodb://localhost:27017/mestodb';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());
app.use(limiter);

app.use(express.json());
// app.use(express.urlencoded({
//   extended: true,
// }));

// app.use((req, res, next) => {
//   req.user = {
//     _id: '637d01b9770881fcf5dc23c2',
//   };
//
//   next();
// });

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: escape(Joi.string().trim().min(2).max(30)
      .default('Dimitry')),
    about: escape(Joi.string().trim().min(2).max(30)
      .default('frontend')),
    avatar: escape(Joi.string().trim().pattern(
      new RegExp('(^https?:\\/\\/[w{3}]?.?[a-zA-z0-9-]{1,}[\\.\\w{2,}]*)[\\/\\w{1,}]*'),
    ).default('https://www.lifesavvy.com/p/uploads/2020/10/269d4e5a.jpg?height=200p&trim=2,2,2,2')),
    email: escape(Joi.string().trim().required().email()),
    password: escape(Joi.string().trim().required().min(8)),
  }),
}), UserController.register);
app.post('/signin', celebrate({
  headers: Joi.object({
    token: escape(Joi.string().required()),
  }).unknown(true),
  body: Joi.object().keys({
    email: escape(Joi.string().trim().required().email()),
    password: escape(Joi.string().trim().required().min(8)),
  }),
}), UserController.login);

app.use(handleAuthUser);

app.use(userRouter);
app.use(cardRouter);

app.use(errors());

app.use('*', (req, res) => {
  res.status(404).json({ message: 'DATA FAIL' });
});

// app.use(handleErrors);

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

// const regExp = /^https?:\/\/w{3}?.?[a-zA-z0-9]\.\w{2,}/g;
// const regExp2 = /^https?:\/\/[w{3}]?.?[a-zA-z0-9-]{1,}\.\w{2,}/g;
// const regExp3 = /(^https?:\/\/[w{3}]?.?[a-zA-z0-9-]{1,}[\.\w{2,}]+)[\/\w{1,}]{1,}+/g;
