const router = require("express").Router();
const Post = require("../models/Post.model")
const Comment = require("../models/Post.model")

router.post("/create", async (req, res, next)=>{
    
    const {title, picture, description} = req.body

    try{
        await Post.create({title, picture, description})
        res.json("Post subido")
    }
    catch(error){
        next(error)
    }

})

router.get("/all", async (req, res, next)=>{

    try{
        const posts = await Post.find().populate("comments")
        res.json(posts)
    }
    catch(error){
        next(error)
    }

})

router.patch("/:id/edit", async (req, res, next)=>{
    const {id} = req.params
    const {title, picture, description} = req.body

    try{
        await Post.findByIdAndUpdate(id, {title, picture, description})
        res.json("Post modificado")
    }
    catch(error){
        next(error)
    }

})

router.delete("/:id/delete", async (req, res, next)=>{

    const {id} = req.params

    try{

        const post = await Post.findById(id).populate("comments")
        await Post.findByIdAndDelete(id)
        console.log(post.comments)

        if(post.comments.length > 0){
            await Comment.deleteMany(post.comments)
            return
        }

        
        res.json("Post borrado")

    }
    catch(error){

    }
})


module.exports = router