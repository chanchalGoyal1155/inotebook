const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user using: POST "api/auth/". Doesn't require auth
router.post(
  '/',
  [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  ],
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the user with the same email already exists
      let existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ error: "A user with this email already exists" });
      }

      // Create a new user
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      await user.save();

      // Send a response with the newly created user
      res.status(201).json(user);
    } catch (error) {
      console.error('Server Error:', error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
