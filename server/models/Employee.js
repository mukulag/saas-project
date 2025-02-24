const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name:String,
    email:String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Populate this field

    created_at: { type: Date, default: Date.now }, 
    updated_at: { type: Date, default: Date.now }, 
    deleted_at: { type: Date, default: null }, 
    status: { type: Boolean, default: null }
})


const EmployeeModel = mongoose.model("Employee" ,EmployeeSchema)

module.exports = EmployeeModel