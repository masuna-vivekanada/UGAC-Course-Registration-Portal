const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register (testing కోసం)
router.post('/register', async (req, res) => {
  try {
    const { name, ldapId, password, role } = req.body;

    const existingUser = await User.findOne({ ldapId });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      ldapId,
      password: hashedPassword,
      role: role || 'user'
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { ldapId, password } = req.body;
    const user = await User.findOne({ ldapId });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, ldapId: user.ldapId },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        ldapId: user.ldapId,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;