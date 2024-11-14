const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: { type: string, required: true },
    spotifyId: { type: string, required: true },
    popularity: { type: number},
    images: [string],
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;