const router = require("express").Router();
const Post = require("../models/Post.model")
const Comment = require("../models/Post.model")
const User = require("../models/User.model")
const isAuth = require("../middlewares/isAuth")

router.post("/:id/create", isAuth, async (req, res, next)=>{
    
    const {title, picture, description, owner} = req.body
    const {id} = req.params

    try{
        const post = await Post.create({title, picture, description, owner})
        await User.findByIdAndUpdate(id, {$addToSet:{posts: post._id}})
        res.json("Post subido")
    }
    catch(error){
        next(error)
    }

})

router.get("/all", isAuth, async (req, res, next)=>{

    try{
        const posts = await Post.find().populate("comments")
        res.json(posts)
    }
    catch(error){
        next(error)
    }

})

router.patch("/:id/edit", isAuth, async (req, res, next)=>{
    const {id} = req.params
    const {title, picture, description} = req.body

    try{
        await Post.findByIdAndUpdate(id, {title, picture, description})
        res.json("Post modificado")
    }
    catch(error){
        next(error)
        res.json({errorMessage: "Error al obtener los post"})
    }

})

router.delete("/:id/delete", isAuth, async (req, res, next)=>{

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
        res.json({errorMessage: "Error al borrar el post"})
    }
})

router.get("/:id", async (req, res, next)=>{
    const {id} = req.params

    try{
        const onlyPost = await Post.findById(id)
        res.json(onlyPost)
    }
    catch(error){
        next(error)
    }

})


module.exports = router