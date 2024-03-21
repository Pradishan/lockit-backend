import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const authUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (/\S+@\S+\.\S+/.test(email)) {
            const user = await User.findOne({ email: email })
            if (user && (await user.matchPassword(password))) {
                return res.status(200).json({
                    status: true, message: "login successfully", user: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        creationDate: user.createdAt,
                        updateDate: user.updatedAt,
                    }
                })
            }
        } else {
            res.status(401).json({  status: false, message: 'Email is not valid' });
        }

        res.status(401).json({ status: false, message: 'Email or password is incorrect' });
    } catch (error) {
        return res.status(500).send({ status: false, message: error });
    }
});

const userRegister = asyncHandler(async (req, res) => {
    try {

        const {
            username, email, password, phoneNumber,
        } = req.body;
        const userExists = await User.findOne({ email })
        if (userExists) {
            res.status(400).json({ status: false, message: "User already exits" });
            throw new Error('User already exits')
        }

        const user = await User.create({
            username, email, password, phoneNumber
        });

        if (user) {
            res.status(201).json({
                status: true, message: "User registered successfully", user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    creationDate: user.createdAt,
                    updateDate: user.updatedAt,
                }
            })
        } else {
            res.status(400).json({ status: false, message: "Invalid user Data" });
            throw new Error('Invalid user Data')
        }
        return res.status(200).send();
    } catch (error) {
        return res.status(500).send({ status: false, message: error });
    }
})


const logoutUser = asyncHandler(async (req, res) => {
    try {
        res.status(200).json({ status: false, message: 'Logout sucessfully' });
    } catch (error) {
        return res.status(500).send({ status: false, message: error });
    }
});


const getUserProfile = asyncHandler(async (req, res) => {
    try {
        let _id = req.params.id
        const user = await User.findById(_id);
        if (user) {
            res.json({
                status: true, message: "User retrived successfully",
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    creationDate: user.createdAt,
                    updateDate: user.updatedAt,
                }
            })
        } else {
            res.status(404).json({ status: false, message: "User not found" });
            throw new Error('User not found');
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error });
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude the password field

        res.status(200).json(users);
    } catch (err) {
        console.error('Failed to fetch users from MongoDB:', err);
        res.status(500).json({ status: false, message: "Failed to fetch users from MongoDB" });
    }
});


const updateUserProfile = asyncHandler(async (req, res) => {
    try {
        let _id = req.params.id
        const user = await User.findById(_id)
        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

            const updatedUser = await user.save();

            res.status(200).json({
                status: true, message: "User profile updated successfully",
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    creationDate: user.createdAt,
                    updateDate: user.updatedAt,
                }
            });
        } else {
            res.status(404).json({ status: false, message: 'User not found' });
            throw new Error('User not found');
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error });
    }
});

const changePassword = asyncHandler(async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        // Check if the old password matches the one stored in the database
        const isPasswordMatch = await user.matchPassword(oldPassword);

        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: 'Old password does not match' });
        }

        // Update the password
        user.password = newPassword;

        // Save the updated user
        await user.save();

        res.status(200).json({
            status: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
});


const deleteUser = asyncHandler(async (req, res) => {
    try {
        let _id = req.params.id
        const user = await User.findById(_id);
        if (user) {
            await user.deleteOne();
            res.status(200).json({ status: true, message: 'User removed' });
        } else {
            res.status(404).json({ status: false, message: 'User not found' });
            throw new Error('User not found');
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error });
    }
})

export { userRegister, logoutUser, getUserProfile, getAllUsers, updateUserProfile, deleteUser, authUser,changePassword }