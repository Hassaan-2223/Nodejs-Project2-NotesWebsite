const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true,
        minlength: 3
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    }

})






const notesUser = new mongoose.model("notesUser",userSchema);



module.exports = notesUser;
