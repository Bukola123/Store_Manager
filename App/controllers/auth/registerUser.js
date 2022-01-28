const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../../models/users');
const { sendMail } = require('../../utils/index');



//This route is only available to registering a store owner
exports.registerUser = async function (req, res) {
    //  check if there are any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, password, firstName,lastName } = req.body;
    //  hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = Math.floor(1 * Math.random() * 9000);

    const user = new User({
        email,
        firstName,
        lastName,
        password: hashedPassword,
        otp,
        isStore_owner: true,
        isAdmin: true,
        isAttendant: true
    });

    // save the user
    try {
        await user.save();
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                errors: [{ msg: 'User already exists' }]
            });
        }
        return res.status(500).json({ err });
    }

    // send verification email
    const subject = 'Verify your account';
    const text = `Hello ${
        user.lastName
    },\n\nPlease verify your account by clicking the link below.\n\nhttp://localhost:3500/api/v1/auth/verify?otp=${otp}&id=${
        user._id
    }`;
    await sendMail(email, subject, text);

    res.status(201).json({ msg: 'Registration Successful' });
};
