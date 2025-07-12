const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();  // Load environment variables

const authRouter = require('./Routes/authRouter.js');
const workspaceRouter = require('./Routes/workspaceRouter.js');
const projectRouter = require('./Routes/projectRouter.js');

const app = express();

// Middleware for CORS
app.use(cors());
app.use(bodyParser.json());

// Middleware for parsing JSON request bodies
app.use(express.json());

// Use the auth routes for authentication
app.use('/api/auth', authRouter);  // All auth routes will be prefixed with /auth
app.use('/api/workspace', workspaceRouter);  // All auth routes will be prefixed with /auth
app.use('/api/project', projectRouter);  // All auth routes will be prefixed with /auth


// Example of a simple unprotected route (public)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Pest Control Management System' });
});

// Catch-all route for handling any undefined request path
app.all("*", (req, res) => {
    return res.json({
        success: false,
        message: "Good Boy! You are in the very right place.",
    });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});