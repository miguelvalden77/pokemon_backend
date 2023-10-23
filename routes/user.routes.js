const router = require("express").Router();
const User = require("../models/User.model")

router.post("/add/pokemon", async (req, res, next) => {

    const { userId, name } = req.body

    try {
        await User.findByIdAndUpdate(userId, { $addToSet: { pokemons: name } })
        console.log(name)
        res.json("Pokemon añadido")
    }
    catch (error) {
        next(error)
    }

})

router.get("/:id", async (req, res, next) => {

    const { id } = req.params

    try {
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

        const authToken = jwt.sign(payload, process.env.SECRET_KEY, { algorithm: "HS256", expiresIn: "4h" })

        res.json({ authToken: authToken })
        //res.json(user)
    }
    catch (error) {
        next(error)
    }

})

router.post("/:name/pokemon", async (req, res, next) => {
    const { name } = req.params
    const { id } = req.body

    try {
        console.log({ name })
        const usuario = await User.findByIdAndUpdate(id, { $pull: { pokemons: name } })
        console.log(usuario, "EJEMPLO")
        res.json(usuario)
    }
    catch (error) {
        next(error)
    }
})

router.get("/getAllPokemon/:userId", async (req, res) => {

    const { userId } = req.params

    try {
        const pokemons = await User.findById(userId).select("pokemons")
        res.json(pokemons)
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router