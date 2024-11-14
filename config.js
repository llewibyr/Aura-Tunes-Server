const { SchemaTypeOptions } = require('mongoose');

require('dotenv').config();

module.exports = {
    spotify:{
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,

    }, 
    mongodb: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
};