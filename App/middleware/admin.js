const User = require('../../App/models/users');

const admin = async (req, res, next) => {
    
    const id = req.user.id;

       
    const storeAdmin = await User.findOne({ id });
    
    
    
    if (!storeAdmin.isAdmin){
        return res.status(401).json({ msg: 'Only an admin is allowed to perform this action' });
    };
    
    next();
};


module.exports = admin;