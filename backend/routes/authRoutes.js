const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const router = express.Router();

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'jsonwebtoken@9.0.2';
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || '1h';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Input validation middleware
const validateRegisterInput = [
  body('name').trim().notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must contain at least one uppercase, one lowercase, one number and one special character')
];

const validateLoginInput = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

// Register route
router.post('/register', validateRegisterInput, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ 
        status: 'fail',
        message: 'User with this email already exists' 
      });
    }

    const newUser = await User.create({ name, email, password });
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

    res.status(201).json({
      status: 'success',
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Registration failed',
      error: NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Login route
router.post('/login', validateLoginInput, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password))) {
      return res.status(401).json({ 
        status: 'fail',
        message: 'Invalid email or password' 
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        status: 'fail',
        message: 'Account is deactivated'
      });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    res.json({ 
      status: 'success',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Login failed',
      error: NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Password reset routes
router.post('/forgot-password', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that email'
      });
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // TODO: Send email with resetToken
    console.log(`Password reset token: ${resetToken}`);

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error sending reset token',
      error: NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.patch('/reset-password/:token', async (req, res) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'Token is invalid or expired'
      });
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error resetting password',
      error: NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Temporary index fix route (run once then remove)
router.get('/fix-indexes', async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection('users');
    const indexes = await collection.indexes();
    
    // Check for duplicate email indexes
    const emailIndexes = indexes.filter(index => 
      index.key && index.key.email === 1
    );
    
    if (emailIndexes.length > 1) {
      await collection.dropIndex('email_1');
      console.log('Duplicate email index removed');
    }
    
    res.json({
      status: 'success',
      message: 'Indexes verified',
      indexes: await collection.indexes()
    });
  } catch (err) {
    console.error('Index fix error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fix indexes',
      error: NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;