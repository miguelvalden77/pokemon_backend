const router = require("express").Router();
const Comment = require("../models/Comment.model")
const User = require("../models/User.model")
const Post = require("../models/Post.model")

const isAuth = require("../middlewares/isAuth")

router.post("/create", isAuth, async (req, res, next)=>{

    const {message, postId, userId} = req.body

    try{
        const comment = await Comment.create({owner: userId, post: postId, message})
        await User.findByIdAndUpdate(userId, {$addToSet:{comments: comment._id}})
        await Post.findByIdAndUpdate(postId, {$addToSet:{comments: comment._id}})
        
        res.json("Comentario creado")
    }
    catch(error){
        next(error)
    }

})

router.post("/:id/delete", async (req, res, next)=>{

    const {id} = req.params
    const {postId, userId} = req.body

    try{
        await Comment.findByIdAndDelete(id)
        const usuario = await User.findByIdAndUpdate(userId, {$pull:{comments: id}})
        await Post.findByIdAndUpdate(postId, {$pull:{comments: id}})
        res.json(usuario)
    }
    catch(error){
        next(error)
    }

})


module.exports = router