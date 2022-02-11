const express = require('express');
const {
    authCredentialsValidation,
    registrationValidation,
    changePasswordValidation,
    passwordValidation,
    emailValidation,
    newUserValidation
} = require('../App/middleware/authValidation');
const {
    registerUser,
    loginUser,
    verifyUser,
    changePassword,
    forgotPassword,
    resetPassword,
    resendVerificationLink,
    makeAdmin,
    addUser,
    newuserchangePassword,
    deactivateUser
} = require('../App/controllers/auth');
const auth = require('../App/middleware/auth');
const admin = require('../App/middleware/admin');


const router = express.Router();

router.post('/register', registrationValidation, registerUser);
router.get('/verify', verifyUser);
router.get('/deactivateUser',[auth,admin], deactivateUser);
router.post('/verify/resend', emailValidation, resendVerificationLink);
router.post('/login', authCredentialsValidation, loginUser);
router.patch(
    '/change-password',
    [auth, changePasswordValidation],
    changePassword
);
router.post('/forgot-password', emailValidation, forgotPassword);
router.patch('/reset-password', passwordValidation, resetPassword);
router.post('/make-admin/:id',[auth, admin],makeAdmin);
router.patch('/add-user',[auth,admin,newUserValidation],addUser);
router.patch(
    '/newuser/:id',
    [changePasswordValidation],
    newuserchangePassword
);

module.exports = router;
