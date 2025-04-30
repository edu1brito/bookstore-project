const Review = require('../models/Review'); // Assuming you will create this model

// Add a review
exports.addReview = (req, res) => {
  const { bookId, userId, reviewText, rating } = req.body;
  const newReview = new Review({ bookId, userId, reviewText, rating });

  newReview.save()
    .then(() => res.json('Review added!'))
    .catch(err => res.status(400).json('Error: ' + err));
};

// Get reviews by book ID
exports.getReviewsByBook = (req, res) => {
  Review.find({ bookId: req.params.bookId })
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json('Error: ' + err));
};

// Delete a review
exports.deleteReview = (req, res) => {
  Review.findByIdAndDelete(req.params.id)
    .then(() => res.json('Review deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
};
