import e from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generate from "../utils/generateToken.js";

// validation user && GET token
//POST /api/users/login
const authUser = asyncHandler(async(req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = await User.findOne({
        email,
    });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generate(user._id),
        });
    } else {
        res.status(401);
        throw new Error("invalid email or password");
    }
});

// register user
//POST /api/users
const registerUser = asyncHandler(async(req, res) => {
    const {
        email,
        name,
        password
    } = req.body;
    const userExists = await User.findOne({
        email,
    });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generate(user._id),
            isAdmin: user.isAdmin,
        });
    } else {
        res.stutus(400);
        throw new Error("Invalid user ID");
    }
});

//GET  user && GET token
//GET /api/users/profile
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("Invalid email or password");
    }
});

//update  user && GET token
//PUT /api/users/profile
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        (user.name = req.body.name || user.name),
        (user.email = req.body.email || user.email);
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generate(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

//ADMIN
//GET  all user
//GET /api/users
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find();
    res.json(users);
});

//ADMIN
//DELETE  user
//DELETE /api/users/:id
const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({
            message: "User removed",
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

//ADMIN
//GET  user by id
//GET /api/users/:id
const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

//ADMIN update  user
//PUT /api/users/:id
const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        (user.name = req.body.name || user.name),
        (user.email = req.body.email || user.email);
        user.isAdmin = req.body.isAdmin;
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
};