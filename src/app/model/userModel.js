var mongoose = require("mongoose");

var _userSchema = mongoose.Schema({
    customerCode: String,
    fullname: String,
    username: String,
    password: String,
    role: {
        type: String,
        enum: ["ADMIN", "STAFF", "CUSTOMER"],
        default: "CUSTOMER",
    },
    phone: String,
    village: String,
    district: String,
    province: String,
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "NOT_SPECIFIED"],
        default: "NOT_SPECIFIED",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    note: String,
});

var userModel = mongoose.model("user", _userSchema);
module.exports = userModel;