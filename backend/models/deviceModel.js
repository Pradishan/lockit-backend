import mongoose from "mongoose";
import User from "./userModel.js";

const deviceSchema = mongoose.Schema({
    deviceID: {
        type: String,
        required: true,
        unique: true
    },
    ownerID: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }, 
    status: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true,
});

deviceSchema.pre('save', async function (next) {
    try {
        const userExists = await User.findOne({ email: this.owner })
        if (!userExists) {
            res.status(404).json({ status: false, message: "User does not exist" });
            throw new Error('User does not exist')
        }
        next();
    } catch (error) {
        next(error); 
    }
});

const Device = mongoose.model('Device', deviceSchema);
export default Device;