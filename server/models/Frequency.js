const mongoose = require('mongoose')

const FrequencySchema = new mongoose.Schema({
    name:String,
    interval_days:String,
    trigger_days:String,
    created_at: { type: Date, default: Date.now }, 
    updated_at: { type: Date, default: Date.now }, 
    deleted_at: { type: Date, default: null }
 })


const FrequencyModel = mongoose.model("frequency" ,FrequencySchema)

module.exports = FrequencyModel