const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        posttext: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: false,
        },
        categories: {
            type: String,
            required: false,
        },
        owner: {
            type: String,
            required: true
        }
        ,ownerid: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);