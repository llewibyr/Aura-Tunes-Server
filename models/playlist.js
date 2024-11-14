const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: { type: string, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    userId: { type: string, required: true },
    description: { type: string },
    public: { type: string, required: true},
});

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;