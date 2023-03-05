const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    name: {
        type: String,
        required: true

    },
    mobile: {
        type: Number,
        required: true

    },
    email: {
        type: String,
        default: "general"

    },
    date: {
        type: Date,
        default: Date.now

    },

})

module.exports = mongoose.model("contact", ContactSchema)