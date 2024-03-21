import express from 'express';
import { deviceRegister, getAllDevices, getDevice, updateDevice, deleteDevice, getDeviceByOwner } from '../controllers/deviceController.js';


const router = express.Router();

router.route('/register').post(deviceRegister);
router.route('/allDevices').get(getAllDevices);
router.route('/:deviceID').get(getDevice).put(updateDevice);
router.route('/:owner/devices').get(getDeviceByOwner)
router.route('/:deviceID/delete').delete(deleteDevice);

export default router;