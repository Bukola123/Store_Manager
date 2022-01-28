const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Sales = require('./sales')


const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isAttendant: {
        type: Boolean,
        default: false
    },
    isStore_owner: {
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    otp: {
        type: Number
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
    sales: [{
        type: Schema.Types.ObjectId,
        ref: 'Sales'
    }]
});


module.exports = mongoose.model('User',userSchema);