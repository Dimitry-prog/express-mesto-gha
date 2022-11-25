import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/UserRouter.js';
import cardRouter from './routes/CardRouter.js';
import handleErrors from './middlewares/handleErrors.js';

const PORT = 3000;
// const DB_URL = 'mongodb+srv://user:user@cluster0.deipiap.mongodb.net/?retryWrites=true&w=majority';
const DB_URL = 'mongodb://localhost:27017/mestodb';

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req);
  req.user = {
    _id: '637d01b9770881fcf5dc23c2',
  };

  next();
});

app.use(userRouter);
app.use(cardRouter);
app.use(handleErrors);

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
    app.listen(PORT, () => console.log(`SERVER WORK AT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

startApp();
