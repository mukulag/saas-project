const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company_name: { type: String, required: false, default: null },
    role: { type: String, required: true, default: "hod" }, 
    created_at: { type: Date, default: Date.now }, 
    updated_at: { type: Date, default: Date.now }, 
    deleted_at: { type: Date, default: null }, 
    status: { type: Boolean, default: null }
});


const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel
