import express from 'express';
import dotenv from 'dotenv';
import cors from'cors';
import userRoutes from './routes/userRoutes.js'
import deviceRoutes from './routes/deviceRouts.js'
import connectDB from './config/db.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT||5000

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended: true}))

// routes
app.use('/api/users', userRoutes);
app.use('/api/devices', deviceRoutes);

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', { root: "./" });
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});