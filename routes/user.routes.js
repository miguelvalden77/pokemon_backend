const router = require("express").Router();
const User = require("../models/User.model")

router.post("/add/pokemon", async (req, res, next)=>{

    const {userId, name} = req.body

    try{
        await User.findByIdAndUpdate(userId, {$addToSet: {pokemons: name}})
        res.json("Pokemon añadido")
    }
    catch(error){
        next(error)
    }

})

router.get("/:id", async (req, res, next)=>{
    
    const {id} = req.params

    try{
        const user = User.findById(id).populate("posts")
        // Obtener posts haciendo peticion a los posts por su id (están en el payload)

        const payload = {
            _id: user._id,
            username: user.username,
            role: user.role,
            pokemons: user.pokemons,
            comments: user.comments,
            posts: user.posts
        }

        const authToken = jwt.sign(payload, process.env.SECRET_KEY, {algorithm: "HS256", expiresIn: "4h"})

        res.json({authToken: authToken})
        //res.json(user)
    }
    catch(error){
        next(error)
    }

})

router.patch("/:name/pokemon", async (req, res, next)=>{
    const {name} = req.params
    const {id} = req.body

    try{
        await User.findByIdAndUpdate(id, {$pull:{pokemons: name}})
    }
    catch(error){
        next(error)
    }
})

module.exports = router