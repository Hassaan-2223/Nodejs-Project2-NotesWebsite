const mongoose = require("mongoose");





const notesSchema = new mongoose.Schema({

    id:{
        type: String,
        required: true
    },
    categories:{
        type:String,
        required: true,
        minlength:3
    },
    title:{
        type: String,
        required: true,
        minlength: 3
    },
    notes:{
        type: String,
        required: true
    }
    

})




const note = new mongoose.model("note",notesSchema);

module.exports = note;