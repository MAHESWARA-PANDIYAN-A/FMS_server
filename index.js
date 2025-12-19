import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './DB/db.js';
import route from './Routes/routes.js';
dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-frontend-url.onrender.com'] 
        : ['http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDb();

app.use('/bmp', route);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
