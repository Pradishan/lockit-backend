import express from 'express';
import { deviceRegister, getAllDevices, getDevice, updateDevice, deleteDevice, getDeviceByOwner, lockDevice, unlockDevice, blockDevice, unblockDevice } from '../controllers/deviceController.js';


const router = express.Router();

router.route('/register').post(deviceRegister);
router.route('/allDevices').get(getAllDevices);
router.route('/:deviceID').get(getDevice).put(updateDevice);
router.route('/:owner/devices').get(getDeviceByOwner);
router.route('/:deviceID/delete').delete(deleteDevice);
router.route('/:deviceID/lock').post(lockDevice);
router.route('/:deviceID/unlock').post(unlockDevice);
router.route('/:deviceID/block').post(blockDevice);
router.route('/:deviceID/unblock').post(unblockDevice);

export default router;