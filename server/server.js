

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path'; 
import { fileURLToPath } from 'url'; 


import connectDB from './config/db.js'; 
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';



connectDB();

const app = express();


app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173', 
    'http://localhost:5174'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));


app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);


if (process.env.NODE_ENV === 'production') {
    
    app.use(express.static(path.join(__dirname, '../client/dist')));

    
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'))
    );
} else {
    
    app.get('/', (req, res) => {
        res.send('Mini LinkedIn Backend API is fully operational in DEVELOPMENT mode!');
    });
}

app.use(notFound);
app.use(errorHandler);

// Define port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});