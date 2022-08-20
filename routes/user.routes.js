const router = require("express").Router();
const User = require("../models/User.model")

router.post("/:name/pokemon", async (req, res, next)=>{

    const {name} = req.params
    const {userId} = req.body

    try{
        await User.findByIdAndUpdate(userId, {$addToSet: {pokemons: name}})
        res.json("Pokemon añadido")
    }
    catch(error){
        next(error)
    }

})


module.exports = router