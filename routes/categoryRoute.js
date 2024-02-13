const express = require('express');
const router = express.Router();
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createCategoryController, updateCategoryController, categoriesController, categoryController, deleteCategoryController, listingsByCategoryController } = require('../controllers/categoryController');

// routes

// Create category route
router.post('/create-category', createCategoryController);

// Update category route
router.put('/update-category/:id', updateCategoryController);

// Get all categories route
router.get('/categories', categoriesController);

// Get single category route
router.get('/category/:slug', categoryController);

// Delete category route
router.delete('/delete-category/:id', deleteCategoryController);

// Fetch listings by category slug route
router.get('/listings-by-category/:slug', listingsByCategoryController);

module.exports = router;