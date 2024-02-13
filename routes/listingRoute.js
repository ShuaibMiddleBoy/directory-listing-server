const express = require('express');
const router = express.Router();
const { isAdmin, requireSignIn } = require('../middlewares/authMiddleware');
const {
  createListingController,
  getAllListings,
  getSingleListing,
  getListingByTitle,
  updateListingController,
  deleteListingController,
  getMyListings, // New route to get user's listings
} = require('../controllers/listingController');

// Create Listing route
router.post("/create-list", requireSignIn, createListingController);

// Get all listing route
router.get('/all-lists', getAllListings);

// Get single list route
router.get('/single-list/:id', getSingleListing);

// Update a listing route
router.put('/update-list/:id', updateListingController);

// Delete a listing route
router.delete('/delete-list/:id', deleteListingController);

// Get listings by titleName route
router.get('/by-title/:titleName', getListingByTitle);

// Get listings created by the logged-in user route
router.get('/my-listings', requireSignIn, getMyListings);

module.exports = router;