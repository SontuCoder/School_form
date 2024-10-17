import express from "express";
const app = express();
import connectionDb from "./config/db.js";
import router from "./routers/router.js";
import cors from "cors";

// Middleware
app.use(express.json());
const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5500'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));


// Connect to database
connectionDb();

// Test route
app.get('/', (req, res) => {
    res.send("hello");
});

// API routes
app.use("/api/student", router);

// Server port
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
