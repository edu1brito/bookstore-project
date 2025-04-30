const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import the authRoutes

const app = express();
const port = 5000;

// Middleware
app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // To allow CORS for frontend requests

// Use the authRoutes
app.use('/api/users', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
