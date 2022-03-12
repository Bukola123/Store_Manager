const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../../models/users');
const { sendMail } = require('../../utils/index');




//This route is only available to registering a store owner
exports.addUser = async function (req, res) {
    //  check if there are any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, firstName,lastName } = req.body;
    //  hash the password
   const password = String(Math.floor(Math.random()*600000));
   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = new User({
        email,
        firstName,
        lastName,
        password: hashedPassword,
        isActive: true,
        isAttendant: true
    });

    // send verification email
    const subject = 'User registered on Store Manager';
    const text = `Hello ${
        user.lastName
    },\n\nPlease change your password by using the default password below: ${password} and clicking the link below.\n\nhttps://store-manager-app.herokuapp.com/api/v1/auth/newuser/:${user._id}`;
    await sendMail(email, subject, text);


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

    
    
    res.status(201).json({ msg: `Registration Successful` });



};
