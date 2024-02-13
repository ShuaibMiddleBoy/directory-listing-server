const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');


const requireSignIn = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

// admin access
const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (user.role !== 1) {
            res.status(404).send({
                Success: false,
                message: "UnAuthorized Access"
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = { requireSignIn, isAdmin }
