const { validationResult } = require('express-validator');

const User = require('../../models/users');

exports.deactivateUser = async function (req, res) {
    const { id } = req.query;

    // find user with id
    const user = await User.findById(id);

    if (user && ! user.isActive) {
        return res.status(200).json({ msg: 'User already inactive' });
    }

    

    // deactivate user
    user.isActive = false;
    user.updatedAt = Date.now();

    // save user
    await user.save();
    // return response
    res.status(200).json({ msg: 'User deactivate successful' });
};

