const {Schema, model} = require("mongoose")

const commentSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    message: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const Comment = model("Comment", commentSchema)

module.exports = Comment
