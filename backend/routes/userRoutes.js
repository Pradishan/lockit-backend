import express from 'express';
import { userRegister,authUser,getAllUsers,deleteUser,logoutUser,getUserProfile,updateUserProfile,changePassword } from '../controllers/userController.js';

const router = express.Router();

router.route('/login').post(authUser);
router.route('/register').post(userRegister);
router.route('/logout').post(logoutUser);
router.route('/allprofile').get(getAllUsers);
router.route('/change-password').put(changePassword);
router.route('/:id/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id/deleteUser').delete(deleteUser);

export default router;