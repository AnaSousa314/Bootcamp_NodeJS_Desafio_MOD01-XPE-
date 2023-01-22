import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

const app = express();

import router from './routes/routes.js';

app.use(express.json());
app.use(router);

app.listen(process.env.PORT, ()=>{
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});