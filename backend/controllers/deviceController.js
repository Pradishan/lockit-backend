import asyncHandler from "express-async-handler";
import Device from "../models/deviceModel.js";
import User from "../models/userModel.js";

const deviceRegister = asyncHandler(async (req, res) => {
    try {

        const {
            deviceID, owner,
        } = req.body;
        const userExists = await User.findOne({ email: owner })

        // if (!userExists) {
        //     res.status(400).json({ status: false, message: "User does not exist" });
        //     throw new Error('User does not exist')
        // }

        let ownerID = userExists._id;

        const deviceExists = await Device.findOne({ deviceID })
        if (deviceExists) {
            res.status(400).json({ status: false, message: "Device already exits" });
            throw new Error('Device already exits')
        }

        const device = await Device.create({
            deviceID, ownerID, owner,
        });

        if (device) {
            res.status(201).json({
                status: true, message: "Device registered successfully",
                device: {
                    _id: device._id,
                    deviceID: device.deviceID,
                    owner: device.owner,
                    active: device.active,
                    status: device.status,
                    creationDate: device.createdAt,
                    updateDate: device.updatedAt,
                }
            })
        } else {
            res.status(400).json({ status: false, message: "Invalid device Data" });
            throw new Error('Invalid device Data')
        }
        return res.status(200).send();
    } catch (error) {
        return res.status(500).send({ status: false, message: error });
    }
})


const getDevice = asyncHandler(async (req, res) => {
    try {
        let deviceID = req.params.deviceID
        const device = await Device.findOne({ deviceID });
        if (device) {
            res.json({
                status: true, message: "device retrived successfully",
                device: {
                    _id: device._id,
                    deviceID: device.deviceID,
                    owner: device.owner,
                    active: device.active,
                    status: device.status,
                    creationDate: device.createdAt,
                    updateDate: device.updatedAt,
                }
            })
        } else {
            res.status(404).json({ status: false, message: "Device not found" });
            throw new Error('Device not found');
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error });
    }
});

const getDeviceByOwner = asyncHandler(async (req, res) => {
    try {
        const owner = req.params.owner;

        const devices = await Device.find({ owner });

        if (devices.length > 0) {
            const formattedDevices = devices.map(device => ({
                _id: device._id,
                deviceID: device.deviceID,
                owner: device.owner,
                active: device.active,
                status: device.status,
                creationDate: device.createdAt,
                updateDate: device.updatedAt,
            }));

            return res.status(200).json({
                status: true,
                message: "Devices retrieved successfully",
                devices: formattedDevices
            });
        } else {
            return res.status(404).json({ status: false, message: "Devices not found for the specified owner" });
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
});


const getAllDevices = asyncHandler(async (req, res) => {
    try {
        const devices = await Device.find({}, { ownerID: 0 });
        res.status(200).json(devices);
    } catch (err) {
        console.error('Failed to fetch devices from MongoDB:', err);
        res.status(500).json({ status: false, message: "Failed to fetch devices from MongoDB" });
    }
});


const updateDevice = asyncHandler(async (req, res) => {
    try {
        let deviceID = req.params.deviceID
        const device = await Device.findOne({ deviceID });
        if (device) {

            device.owner = req.body.owner || device.owner;
            device.active = req.body.active || device.active;
            device.status = req.body.status || device.status;

            const updatedDevice = await device.save();

            res.status(200).json({
                status: true, message: "Device updated successfully",
                device: {
                    _id: device._id,
                    deviceID: device.deviceID,
                    owner: device.owner,
                    active: device.active,
                    status: device.status,
                    creationDate: device.createdAt,
                    updateDate: device.updatedAt,
                }
            });
        } else {
            res.status(404).json({ status: false, message: 'Device not found' });
            throw new Error('Device not found');
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error });
    }
});

const deleteDevice = asyncHandler(async (req, res) => {
    try {
        let deviceID = req.params.deviceID
        const device = await Device.findOne({ deviceID });
        if (device) {
            await device.deleteOne();
            res.status(200).json({ status: true, message: 'device removed' });
        } else {
            res.status(404).json({ status: false, message: 'device not found' });
            throw new Error('device not found');
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error });
    }
})

const lockDevice = asyncHandler(async (req, res) => {
    try {
        let deviceID = req.params.deviceID
        const device = await Device.findOne({ deviceID });
        if (device) {

            if (!device.active) {
                return res.status(400).send({ status: false, message: `DEVICE ${req.params.deviceID} is blocked.` });
            }

            if (device.status) {
                return res.status(400).send({ status: false, message: `DEVICE ${req.params.deviceID} is alrady locked.` });
            }

            if (device.ownerID === req.body.ownerID) {

                device.status = true;
                const updatedDevice = await device.save();

                return res.status(200).send({ status: true, message: `DEVICE ${req.params.deviceID} is locked` })

            } else {
                return res.status(400).send({ status: false, message: `unautharized activity` });
            }

        } else {
            res.status(404).json({ status: false, message: 'device not found' });
            throw new Error('device not found');
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error });
    }
})

const unlockDevice = asyncHandler(async (req, res) => {
    try {
        let deviceID = req.params.deviceID
        const device = await Device.findOne({ deviceID });
        if (device) {

            if (!device.active ) {
                return res.status(400).send({ status: false, message: `DEVICE ${req.params.deviceID} is blocked. Cannot unlock.` });
            }
            if (!device.status) {
                return res.status(400).send({ status: false, message: `DEVICE ${req.params.deviceID} is already unlocked.` });
            }

            if (device.ownerID === req.body.ownerID) {

                device.status = false;
                const updatedDevice = await device.save();

                return res.status(200).send({ status: true, message: `DEVICE ${req.params.deviceID} is unlocked` })

            } else {
                return res.status(400).send({ status: false, message: `unautharized activity` });
            }

        } else {
            res.status(404).json({ status: false, message: 'device not found' });
            throw new Error('device not found');
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error });
    }
})

const blockDevice = asyncHandler(async (req, res) => {
    try {
        let deviceID = req.params.deviceID
        const device = await Device.findOne({ deviceID });
        if (device) {

            if (!device.active ) {
                return res.status(400).send({ status: false, message: `DEVICE ${req.params.deviceID} is already blocked.` });
            }

            if (device.ownerID === req.body.ownerID) {

                device.active = false;
                device.status = false;

                const updatedDevice = await device.save();

                return res.status(200).send({ status: true, message: `DEVICE ${req.params.deviceID} is blocked` })

            } else {
                return res.status(400).send({ status: false, message: `unautharized activity` });
            }

        } else {
            res.status(404).json({ status: false, message: 'device not found' });
            throw new Error('device not found');
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error });
    }
})

const unblockDevice = asyncHandler(async (req, res) => {
    try {
        let deviceID = req.params.deviceID
        const device = await Device.findOne({ deviceID });
        if (device) {

            if (device.active ) {
                return res.status(400).send({ status: false, message: `DEVICE ${req.params.deviceID} is already unblocked.` });
            }

            if (device.ownerID === req.body.ownerID) {

                device.active = true;
                device.status = true;

                const updatedDevice = await device.save();

                return res.status(200).send({ status: true, message: `DEVICE ${req.params.deviceID} is unblocked` })

            } else {
                return res.status(400).send({ status: false, message: `unautharized activity` });
            }

        } else {
            res.status(404).json({ status: false, message: 'device not found' });
            throw new Error('device not found');
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error });
    }
})

export { deviceRegister, getDevice, getAllDevices, deleteDevice, updateDevice, getDeviceByOwner, lockDevice, unlockDevice, blockDevice, unblockDevice }