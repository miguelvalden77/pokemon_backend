const { Schema, model } = require("mongoose")

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
},
{
    timestamps: true
})

const Post = model("Post", postSchema)

module.exports = Post