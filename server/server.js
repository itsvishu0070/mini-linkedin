// // server/server.js (or app.js)
// import "dotenv/config"; // Loads environment variables from .env at the very beginning
// import express from "express";
// import cors from "cors";
// import connectDB from "./config/db.js"; // Database connection setup

// // Import routes
// import authRoutes from "./routes/authRoutes.js";
// import postRoutes from "./routes/postRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

// // Import error handling middleware
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// // Connect to MongoDB
// connectDB();

// const app = express();

// // Middleware
// app.use(express.json()); // Body parser: enables app to parse JSON from incoming requests
// app.use(cors()); // Enable Cross-Origin Resource Sharing for frontend communication

// // API Routes
// app.use("/api/auth", authRoutes); // Authentication routes (register, login)
// app.use("/api/posts", postRoutes); // Post-related routes (create, get all, get by user)
// app.use("/api/users", userRoutes); // User-related routes (get profile)

// // Root route for initial server test
// app.get("/", (req, res) => {
//   res.send("Mini LinkedIn Backend API is fully operational!");
// });

// // Error handling middleware (MUST be placed AFTER all other routes and middleware)
// app.use(notFound); // Catches 404 Not Found errors
// app.use(errorHandler); // Handles all other errors

// // Define port for the server to listen on
// const PORT = process.env.PORT || 5000;

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
// });


// server/server.js
import 'dotenv/config'; // Loads environment variables from .env
import express from 'express';
import cors from 'cors';
import path from 'path'; // Import path module
import { fileURLToPath } from 'url'; // For ES Modules __dirname equivalent

// IMPORTANT: ALL YOUR OTHER IMPORTS FOR ROUTES, DB, MIDDLEWARE GO HERE
import connectDB from './config/db.js'; // <--- THIS WAS THE MISSING IMPORT
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';


// Connect to MongoDB
connectDB(); // Now connectDB is defined

const app = express();

// Middleware
app.use(express.json());

// Define __dirname equivalent for ES Modules (Needed for static file serving)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Production CORS setup: Only allow your specific client URL
const allowedOrigins = [
    process.env.CLIENT_URL, // Your deployed frontend URL
    'http://localhost:5173', // For local frontend development
    'http://localhost:5174' // If your Vite dev server might run on this port
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

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// -------------------------------------------------------------
// Serve frontend static assets in production (OPTIONAL: only if deploying monolithically)
// If you deploy Frontend (Vercel/Netlify) and Backend (Render/Railway) separately,
// you can REMOVE this entire 'if (process.env.NODE_ENV === 'production')' block.
// -------------------------------------------------------------
if (process.env.NODE_ENV === 'production') {
    // Set static folder (where your client's build output will be)
    app.use(express.static(path.join(__dirname, '../client/dist')));

    // For any unhandled routes, serve the index.html from the client build
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'))
    );
} else {
    // Only show API status message in development
    app.get('/', (req, res) => {
        res.send('Mini LinkedIn Backend API is fully operational in DEVELOPMENT mode!');
    });
}
// -------------------------------------------------------------

// Error handling middleware (MUST be placed AFTER all other routes and middleware)
app.use(notFound);
app.use(errorHandler);

// Define port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});