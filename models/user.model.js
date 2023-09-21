const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: "Blog",
        require: true 
    }]
})

module.exports = User = mongoose.model("User", userSchema);