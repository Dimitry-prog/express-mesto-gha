import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/UserRouter.js';
import cardRouter from './routes/CardRouter.js';

const PORT = 3000;
// const DB_URL = 'mongodb+srv://user:user@cluster0.deipiap.mongodb.net/?retryWrites=true&w=majority';
const DB_URL = 'mongodb://localhost:27017/mestodb';

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req);
  req.user = {
    _id: '637bc178186f17a1e0b0364f',
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);

app.use((req, res, next) => {
  res.status(404).send("We can't find it");
  next();
});

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
    app.listen(PORT, () => console.log(`SERVER WORK AT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

startApp();
