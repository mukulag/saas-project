const mongoose = require('mongoose')

const ExcelUpload = new mongoose.Schema({
    successJson: {type: Object},
    errorJson: {type: Object},
    fullyFinished: {type: Boolean,  default: false},
    status: { type: Boolean, default: null },
    created_at: { type: Date, default: Date.now }, 
    updated_at: { type: Date, default: Date.now }, 
    
});


const ExcelUploadModel = mongoose.model("ExcelUpload", ExcelUpload)

module.exports = ExcelUploadModel
