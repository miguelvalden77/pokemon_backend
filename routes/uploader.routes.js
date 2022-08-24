const router = require("express").Router();
const User = require("../models/User.model")
const Post = require("../models/Post.model")
const uploader = require("../middlewares/uploader")

router.post("/", uploader.single("image"), (req, res, next)=>{

    if(req.file === undefined){
        res.status(400).json({errorMessage: "No se pudo subir la imagen"})
        return
    }

    res.json({imageUrl: req.file.path})

})


module.exports = router