import express from 'express';
import mongoose from 'mongoose';
import router from './routes/UserRouter.js';

const PORT = 3000;
// const DB_URL = 'mongodb+srv://user:user@cluster0.deipiap.mongodb.net/?retryWrites=true&w=majority';
const DB_URL = 'mongodb://localhost:27017/mestodb';

const app = express();

app.use(express.json());
app.use('/', router);

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
    app.listen(PORT, () => console.log(`SERVER WORK AT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

startApp();
