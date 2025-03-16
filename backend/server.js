import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import db from './db.js';
import lyricroute from './routes/lyricroute.js';
import lyricllm from './routes/generateroute.js';
import userRoute from './routes/userroute.js';

dotenv.config();
const app = express();
app.use(cors({ origin:process.env.FRONTEND_URL}));
app.use(express.json());

app.use('/api', lyricroute);
app.use('/', lyricllm);
app.use('/user', userRoute);
app.listen(process.env.PORT, () => {
    db();
    console.log(`Server running on port ${process.env.PORT}`);
});
