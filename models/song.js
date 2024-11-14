const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: { type: string, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
    album: { type: string },
    spotifyId: { type: string, required: true},
    duration: { type: number },
    popularity: { type: number },
    preview_url: { type: string },
});

const Song = mongoose.model('Song, songSchema');
module.exports = Song;