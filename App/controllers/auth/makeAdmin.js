const { validationResult } = require('express-validator');

const User = require('../../models/users');

exports.makeAdmin = async function (req,res){
       
    const  id  = req.params.id;
    

    // find user with email
    const user = await User.findById(id);
    
    if (!user) {
        return res.status(401).json({ msg: 'User not found' });
    };
    if (user.isAdmin) {
        return res
            .status(400)
            .json({ msg: 'User is already an admin' });

    };

    user.isAdmin = true;

    // save user
    await user.save();
    // return response
    res.status(200).json({ msg: 'User added as an Admin' });


}