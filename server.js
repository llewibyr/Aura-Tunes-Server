// // Imports
 const express = require('express');
 const dotenv = require('dotenv');
 const mongoose = require('mongoose');
const cors = require('cors');
const spotifyRouter = require('./routes/spotify');
const { mongodb } = require('./config');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/spotify', spotifyRouter);
app.use('/api/users', userRoutes);
// Mongoose Connection
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }) 
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));


//App Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


