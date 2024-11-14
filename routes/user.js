const express = require('express');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const User = require('../models/user');
const {jwtSecret} = require('../config');

const router = express.Router();

// Rout to register a New User
router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({error: 'User already exists'});
    }

    const user = new user({
        name,
        email,
        password,
    });

    await user.save();
    res.status(201).json({message: 'User registered successfully'});
} catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
    }
});

// User Login
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({error: 'User not found'});
        }
        // Password Match Checker
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({error: 'Invalid password'});
        }
        // Creates JWT Token
        const token = jwt.sign({id: user._id, name: user.name}, jwtSecret, {expiresIn: '1h'}

        );


        res.json({token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

// Gets User Profile(Needs Auth)
router.get('/profile', async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied'});
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(404).json({ message: 'User not found'});
        }

        res.json({
            name: user.name,
            email: user.email,
            spotifyId: user.spotifyId
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token is not valid'});
    }
});

module.exports = router;