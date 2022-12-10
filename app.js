import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { limiter } from './utils/constants.js';
import appRouter from './routes/index.js';
import handleErrors from './middlewares/handleErrors.js';

dotenv.config();

const PORT = 3000;
// const DB_URL = 'mongodb+srv://user:user@cluster0.deipiap.mongodb.net/?retryWrites=true&w=majority';
const DB_URL = 'mongodb://localhost:27017/mestodb';
const app = express();

app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(express.json());

app.use(appRouter);

app.use(errors());
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
