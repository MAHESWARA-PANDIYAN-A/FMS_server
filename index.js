import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './DB/db.js';
import route from './routes/routes.js';

dotenv.config();

const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDb();

app.use('/bmp', route);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
