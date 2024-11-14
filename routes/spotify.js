const express = require('express');
const axios = require('axios');
const Artist = require('../models/artist');
const songs = require('./models/songs');
const Playlist = require('../models/playlist');
const { spotify} = require('../config');

const router = express.Router();

// Spotify Authentication
const getSpotifyAuthHeader = async () => {
    const response = await axios.post ('https://accounts.spotify.com/api/token', new URLSearchParams({
        grant_type: 'client_credentials'
    }), {
        headers: {
            'Authorization': `Basic ${Buffer.from(`${spotify.clientId}:${spotify.clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response.data.access_token;
    };

    // Route for retrieving Artist tracks
    router.get('/artists/:id/tracks', async (req, res) => {
        const accessToken = await getSpotifyAuthHeader();
        const artistid = req.params.id;

        try {
            const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
                headers: {'Authorization': `Bearer ${accessToken}`}
            });
            const tracks = response.data.tracks;

            // Function to Save Tracks
            const savedTracks = [];
            for (let track of tracks) {
                const songs = new Song({
                    title: track.name,
                    spotifyId: track.id,
                    album: track.album.name,
                    spotifyId: track.id,
                    duration: track.duration_ms,
                    popularity: track.popularity,
                    preview_url: track.preview_url
                });
                savedTracks.push(await songs.save());
            }
            res.json(savedTracks);
        } catch (error) {
            console.error(error);
            res.sendStatus(500).json({ error: 'Failed to retrieve artist tracks' });
        }
    });

    module.exports = router;