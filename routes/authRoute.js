const express = require('express');
const { registerController, loginController, forgotPasswordController ,getUserProfile, getAllUsers } = require('../controllers/registerController');
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
// Router Object
const router = express.Router();


// routing
// REGISTER || METHOD POST
router.post('/register', registerController);

// LOGIN || METHOD POST
router.post('/login', loginController);

router.get('/user-profile', requireSignIn, getUserProfile);
// get all users
router.get('/users', getAllUsers);


// protect route auth (user)
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(201).send({ ok: true });
})


// protect route auth (admin)
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(201).send({ ok: true });
})

// forgot password route
router.post('/forgot-password', forgotPasswordController);

// get all users
router.get('/users', getAllUsers);

module.exports = router;