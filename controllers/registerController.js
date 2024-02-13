const userModel = require('../models/usersModel.js');
const { hashPassword, comparePassword } = require("../helpers/authHelper.js");
const jwt = require("jsonwebtoken");

// For Registration || POST
const registerController = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, cPassword, securityQuestion } = req.body;

        // validation
        if (!firstName) {
            res.json({ "message": "First Name is Required" });
        }
        if (!lastName) {
            res.json({ "message": "Last Name is Required" });
        }
        if (!email) {
            res.json({ "message": "Email is Required" });
        }
        if (!phone) {
            res.json({ "message": "Phone is Required" });
        }
        if (!password) {
            res.json({ "message": "Password is Required" });
        }
        if (!cPassword) {
            res.json({ "message": "Confirm Password is Required" });
        }
        if (!securityQuestion) {
            res.json({ "message": "Confirm Password is Required" });
        }

        // check if the password and the confirm password match
        if (password != cPassword) {
            res.json({ "error": "Password and Confirm Password do not match" });
            return;
        }

        // check user
        const existingUser = await userModel.findOne({ email });
        // existing user
        if (existingUser) {
            return res.status(404).send({
                success: false,
                message: "Already Register please login"
            })
        }

        // register user
        const hashedPassword = await hashPassword(password);

        const user = new userModel({
            firstName, lastName, email, phone, password: hashedPassword, securityQuestion
        });

        const result = await user.save();

        res.status(200).send({
            success: true,
            message: "User Regisger Successfully",
            result
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
}


// For Login || POST

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }

        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }

        // checking password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(404).send({
                success: false,
                message: "Invalid Password"
            })
        }
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                role: user.role
            },
            token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in login',
            error
        })
    }
}

const forgotPasswordController = async (req, res) => {
    try {
        const { email, securityQuestion, newPassword } = req.body;
        if (!email) {
            res.status(404).send("Email is required");
        }
        if (!securityQuestion) {
            res.status(404).send("Security Question is required");
        }
        if (!newPassword) {
            res.status(404).send("New Password is required");
        }
        // check
        const user = await userModel.findOne({ email, securityQuestion });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Answer"
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(201).send({
            success: true,
            message: "Password Reset Successfully.."
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}
const getAllUsers = async (req, res) => {
    try {
        // Using await to properly handle the asynchronous operation.
        const users = await userModel.find({});

        // Check if users array is not empty
        if(users && users.length > 0){
            res.status(200).send({
                success: true,
                message: "Users retrieved successfully",
                data: users // Changed 'result' to 'data' for clarity.
            });
        } else {
            // In case there are no users found.
            res.status(404).send({
                success: false,
                message: "No users found"
            });
        }        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message // Send a more readable error message.
        });
    }
}

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).send({
            success: true,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in getting user profile',
            error
        });
    }
}

module.exports = { registerController, loginController, forgotPasswordController,getUserProfile, getAllUsers }