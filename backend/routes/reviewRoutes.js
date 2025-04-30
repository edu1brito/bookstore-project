const express = require('express');
const { addReview, getReviewsByBook, deleteReview } = require('../controllers/reviewController');
const router = express.Router();

// Get reviews by book ID
router.get('/:bookId', getReviewsByBook);

// Add or modify a review
router.post('/:bookId', addReview);

// Delete a review
router.delete('/:id', deleteReview);

module.exports = router;
