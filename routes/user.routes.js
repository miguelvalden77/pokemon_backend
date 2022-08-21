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
        console.log
        res.json(user)
    }
    catch(error){
        next(error)
    }

})


module.exports = router