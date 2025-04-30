const User = require('../models/User'); // Assuming you will create this model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
exports.registerUser = (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err });

    const newUser = new User({ username, email, password: hashedPassword });

    newUser.save()
      .then(() => res.status(201).json('User registered!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
};

// Login user
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json('User not found');

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ error: err });

        if (!isMatch) return res.status(400).json('Invalid credentials');

        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
      });
    })
    .catch(err => res.status(500).json('Error: ' + err));
};
