const { loginUser } = require('./loginUser');
const { verifyUser, resendVerificationLink } = require('./verifyUser');
const { registerUser } = require('./registerUser');
const { changePassword, forgotPassword, resetPassword , newuserchangePassword} = require('./password');
const {makeAdmin } = require('./makeAdmin');
const {addUser} = require('./addUsers');


module.exports = {
    loginUser,
    registerUser,
    verifyUser,
    resendVerificationLink,
    changePassword,
    forgotPassword,
    resetPassword,
    makeAdmin,
    addUser,
    newuserchangePassword
};
