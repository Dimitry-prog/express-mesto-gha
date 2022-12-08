import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { loginUser, registerUser } from './controllers/UserController.js';
import handleErrors from './middlewares/handleErrors.js';
import { limiter } from './utils/constants.js';
import appRouter from './routes/index.js';
import { validationQuerySignin, validationQuerySignup } from './helpers/validationQuery.js';
import handleAuthUser from './middlewares/handleAuthUser.js';

dotenv.config();

const PORT = 3000;
// const DB_URL = 'mongodb+srv://user:user@cluster0.deipiap.mongodb.net/?retryWrites=true&w=majority';

const DB_URL = 'mongodb://localhost:27017/mestodb';

const app = express();

app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(express.json());

app.post('/signup', validationQuerySignup, registerUser);
app.post('/signin', validationQuerySignin, loginUser);

app.use(handleAuthUser);

app.use(appRouter);

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
