const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:  "User"
    },
    title:{
        type:String,
        // required: true,
    },
    description:{
        type: String,
        // required: true
    },
    date:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("Task", taskSchema);